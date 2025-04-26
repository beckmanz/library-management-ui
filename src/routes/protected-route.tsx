import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/sidebar";
import { Toaster } from "sonner";

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user ? (
    <div className="flex min-h-screen min-w-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <Toaster />
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
}
