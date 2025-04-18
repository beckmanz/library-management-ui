import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./public-route";
import { LoadingPage } from "../components/loading/loadingPage";

const Signin = lazy(() => import("../screens/auth/signin"));
const Signup = lazy(() => import("../screens/auth/signup"));

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
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/signin" replace />,
  },
]);

export default router;
