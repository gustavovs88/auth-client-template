import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { RequireAuth } from "@components/pages/public/authentication/RequireAuth";
import CustomerProfilePage from "@components/pages/app/customerProfile";
import HomePage from "@pages/app/home";

export const appRoutes: RouteObject[] = [
  {
    path: "/app/home",
    element: <HomePage />,
  },
  {
    path: "/app/customer-profile",
    element: <CustomerProfilePage />,
  },
];

// Ensures require authentication to all App routes
appRoutes.forEach(
  (route) =>
    (route.element = <RequireAuth>{route.element as ReactElement}</RequireAuth>)
);
