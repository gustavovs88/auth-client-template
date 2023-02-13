import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "@components/pages/public/authentication/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@components/globals/LoadingSpinner";

function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let [isLoading, setIsLoading] = useState(true);
  let auth = useAuth();
  let location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    auth.signin(token, () => {
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-400 bg-opacity-50">
        <LoadingSpinner size="lg"></LoadingSpinner>
      </div>
    );
  } else {
    if (!auth?.user) {
      return <Navigate to="/app/login" state={{ from: location }} replace />;
    }
  }

  return children;
}
