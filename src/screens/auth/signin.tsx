import { Link, useNavigate } from "react-router-dom";
import Library from "../../assets/Studying-bro.svg";
import { ButtonDefault } from "../../components/button";
import { InputDefault } from "../../components/input";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingPage } from "../../components/loading/loadingPage";

export default function Signin() {
  const { signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signin(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center gap-7 p-2 md:p-8">
      <div className="hidden h-full w-150 lg:flex">
        <img src={Library} alt="Library" />
      </div>
      <div className="flex h-full w-full md:w-auto">
        <form className="flex h-full w-full flex-col items-center justify-center gap-10 rounded-3xl md:w-110 md:px-3.5 md:py-5">
          <header className="flex flex-col items-center justify-center gap-2.5 p-7">
            <h1 className="text-2xl font-bold md:text-4xl">
              Bem vindo de volta!
            </h1>
            <p className="text-center">
              Gerencie seu acervo com facilidade e precisão. Sua biblioteca
              digital aguarda!
            </p>
          </header>
          <div className="mb-7 flex w-full flex-col gap-2.5">
            <InputDefault
              value={email}
              required={true}
              onChange={setEmail}
              type="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              errorMessage="Digite um email válido"
              placeholder="Digite seu email aqui"
            />
            <InputDefault
              value={password}
              onChange={setPassword}
              required={true}
              type="password"
              placeholder="Digite sua senha aqui"
            />
          </div>
          <ButtonDefault
            OnClick={() => handleSubmit(email, password)}
            name="Entrar"
          />
          <p>
            Ainda não possui uma conta? então{" "}
            <Link className="text-purple-500" to="/signup">
              registre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
