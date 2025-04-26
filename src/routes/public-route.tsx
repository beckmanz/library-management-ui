import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "sonner";

export default function PublicRoute() {
  const { user } = useAuth();
  return !user ? (
    <div className="flex min-h-screen min-w-screen">
      <Outlet />
      <Toaster />
    </div>
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
