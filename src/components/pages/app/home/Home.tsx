import { Button } from "@components/globals/Button";
import { authenticate } from "@components/pages/public/authentication/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@components/pages/public/authentication/AuthProvider";
import { Text } from "@components/globals/Text";
import { useContext } from "react";

export function Home() {
  let location = useLocation();
  let navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleLogout");
    authenticate.signout(() => {
      navigate("/app/login", { state: { from: location }, replace: true });
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-14">
      <div className="flex flex-col items-center justify-center h-full max-w-md  gap-6">
        <Text>
          Olá {context.user.customerName}, login realizado com sucesso
        </Text>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
