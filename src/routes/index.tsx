import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./public-route";
import { LoadingPage } from "../components/loading/loadingPage";
import ProtectedRoute from "./protected-route";

const Signin = lazy(() => import("../screens/auth/signin"));
const Signup = lazy(() => import("../screens/auth/signup"));
const Dashboard = lazy(() => import("../screens/dashboard/index"));

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/signin" replace />,
  },
]);

export default router;
