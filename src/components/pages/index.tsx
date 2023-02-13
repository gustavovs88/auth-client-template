import { AuthProvider } from "@components/pages/public/authentication/AuthProvider";
import { memo } from "react";

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import { publicRoutes } from "@pages/public";
import { appRoutes } from "@pages/app";
import HomePage from "@pages/app/home";
import { RequireAuth } from "@pages/public/authentication/RequireAuth";

const defaultRoute = {
  path: "/",
  element: (
    <RequireAuth>
      <HomePage />
    </RequireAuth>
  ),
};
const router = createBrowserRouter([
  defaultRoute,
  ...publicRoutes,
  ...appRoutes,
]);

const Pages = memo(() => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
});

export default Pages;
