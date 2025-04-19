import { Link, useNavigate } from "react-router-dom";
import Library from "../../assets/Bibliophile-pana.svg";
import { ButtonDefault } from "../../components/button";
import { InputDefault } from "../../components/input";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingPage } from "../../components/loading/loadingPage";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setIsLoading(true);
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
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
            <h1 className="text-2xl font-bold md:text-4xl">Crie sua conta</h1>
            <p className="text-center">
              Registre-se para organizar livros e empréstimos em poucos cliques.
            </p>
          </header>
          <div className="mb-7 flex w-full flex-col gap-2.5">
            <InputDefault
              value={name}
              required={true}
              onChange={setName}
              pattern=".{4,}"
              errorMessage="O nome deve ter pelo menos 4 caracteres"
              placeholder="Digite seu email aqui"
            />
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
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              errorMessage="A senha deve ter pelo menos 8 caracteres, incluindo letras e números"
              placeholder="Digite sua senha aqui"
            />
          </div>
          <ButtonDefault
            OnClick={() => handleSubmit(name, email, password)}
            name="Criar Conta"
          />
          <p>
            Já possui uma conta? então{" "}
            <Link className="text-purple-500" to="/signin">
              entre aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
