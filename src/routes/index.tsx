import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./public-route";
import { LoadingPage } from "../components/loading/loadingPage";
import ProtectedRoute from "./protected-route";

const Signin = lazy(() => import("../screens/auth/signin"));
const Signup = lazy(() => import("../screens/auth/signup"));
const Authors = lazy(() => import("../screens/dashboard/author"));
const Books = lazy(() => import("../screens/dashboard/books"));
const Loans = lazy(() => import("../screens/dashboard/loans"));
const Readers = lazy(() => import("../screens/dashboard/readers"));

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
            <Books />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/Authors",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Authors />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/loans",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Loans />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/readers",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Readers />
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
