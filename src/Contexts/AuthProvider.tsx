import { ReactNode, useEffect, useState } from "react";
import api from "../config/api";
import { AuthContext, User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const token = localStorage.getItem("@Auth:token");
    if (token) {
      const userData = localStorage.getItem("@Auth:user");
      if (userData) {
        const parsedUser = JSON.parse(userData) as User;
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  async function signin(email: string, password: string) {
    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });
      const userData = response.data.data;
      let user: User = {
        id: userData.id,
        name: userData.name,
        email,
      };

      setUser(user);
      localStorage.setItem("@Auth:token", userData.token);
      localStorage.setItem("@Auth:user", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Erro ao fazer Autenticação:", error);
      throw error;
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      const userData = response.data.data;
      let user: User = {
        id: userData.id,
        name: userData.name,
        email,
      };

      setUser(user);
      localStorage.setItem("@Auth:token", userData.token);
      localStorage.setItem("@Auth:user", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Erro ao fazer Autenticação:", error);
      throw error;
    }
  }

  async function signout() {
    setUser(null);
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
