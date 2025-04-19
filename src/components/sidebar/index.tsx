import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProfileIcon from "../../assets/profile-icon.jpeg";
import Logo from "../../assets/Visual_Syntax_Design_Inc_logo.svg";
import {
  HomeIcon,
  BookOpenIcon,
  ArrowPathIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import { LoadingPage } from "../loading/loadingPage";

export default function Sidebar() {
  const { user, signout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", icon: HomeIcon, label: "Início" },
    { path: "/dashboard/books", icon: BookOpenIcon, label: "Livros" },
    { path: "/dashboard/loans", icon: ArrowPathIcon, label: "Empréstimos" },
    { path: "/dashboard/readers", icon: UsersIcon, label: "Leitores" },
  ];

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/signin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <aside className="flex min-h-screen w-74 flex-col bg-white px-4 text-white">
      <div className="mb-8 flex w-full items-center gap-2.5 border-b py-6">
        <img className="h-14" src={Logo} alt="Profile Icon" />
        <h1 className="text-2xl font-semibold text-blue-950">Library System</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-3 transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-[#526581] hover:bg-black hover:text-white"
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex w-full items-center justify-center py-6">
        <div className="flex flex-1 gap-2.5">
          <img
            className="h-14 rounded-full"
            src={ProfileIcon}
            alt="Profile Icon"
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-semibold text-blue-950">
              {user?.name || "Usuário"}
            </p>
            <p className="text-sm text-black/70">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignout}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
        >
          <RiLogoutBoxLine color="gray" className="h-6 w-6" />
        </button>
      </div>
    </aside>
  );
}
