import { RouteObject } from "react-router-dom";
import LoginPage from "@pages/public/authentication/login";
import RequestResetPasswordPage from "@pages/public/authentication/resetPassword/requestResetPassword";
import ResetPasswordPage from "@pages/public/authentication/resetPassword/resetPassword";

export const publicRoutes: RouteObject[] = [
  {
    path: "/app/login",
    element: <LoginPage />,
  },
  {
    path: "/app/request-reset-password",
    element: <RequestResetPasswordPage />,
  },
  {
    path: "/app/reset-password",
    element: <ResetPasswordPage />,
  },
];
