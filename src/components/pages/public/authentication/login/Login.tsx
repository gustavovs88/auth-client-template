import { At, Eye, EyeSlash, Lock } from "phosphor-react";
import { useCallback, useState } from "react";
import { Button } from "@components/globals/Button";
import { IconToggle } from "@components/globals/IconToggle";
import { InputText } from "@components/globals/InputText";
import { LoadingSpinner } from "@components/globals/LoadingSpinner";
import { Text } from "@components/globals/Text";
import Fetch from "@utils/fetchClient/fetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heading } from "@components/globals/Heading";
import { BaseError } from "@pages/public/authentication/BaseError";
import Carousel from "nuka-carousel";
import { BaseWrapper } from "@components/pages/public/authentication/BaseWrapper";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const onError = useCallback(() => {
    setCurrentView(1);
  }, []);
  const onReturn = useCallback(() => {
    setIsLoading(false);
    setCurrentView(0);
  }, []);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/app/home";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    if (isValid) {
      const formData = new FormData(formElement);
      const postData = Object.fromEntries(formData.entries());
      try {
        const login = await Fetch.post("api/v1/auth/login", postData);
        if (login?.error) {
          setErrorMessage(login.error.message.formatted);
          onError();
        } else {
          localStorage.setItem("accessToken", login.accessToken);
          setIsLoading(false);
          navigate(from, { replace: true });
        }
      } catch (error) {
        setErrorMessage(
          "Tivemos um problema. Tente novamente, se o problema persistir entre em contato conosco."
        );
        onError();
      }
    } else {
      setIsLoading(false);
    }
  };
  return (
    <BaseWrapper>
      <Carousel
        slideIndex={currentView}
        withoutControls={true}
        dragging={false}
        swiping={false}
      >
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto p-4 2xl:max-w-md mt-10 gap-2">
          <header className="lg:mt-20 flex flex-col items-start justify-start w-full lg:ml-8 lg:px-8">
            <div className="flex items-center justify-center relative -top-4 -left-4 lg:hidden bg-gray-800 w-36 h-12 text-center">
              Logo
            </div>
            <Heading size="lg" className="text-left">
              Bem vindo!
            </Heading>
            <Text size="sm">Para acessar preencha com seus dados:</Text>
          </header>

          <form
            className="flex flex-col w-full"
            noValidate
            onSubmit={handleSubmit}
          >
            <InputText.Root errorText="E-mail inválido">
              <InputText.Icon>
                <At />
              </InputText.Icon>
              <InputText.Input
                id="email"
                name="email"
                placeholder="E-mail"
                type="email"
                required={true}
              ></InputText.Input>
            </InputText.Root>

            <InputText.Root>
              <InputText.Icon>
                <Lock weight="fill" />
              </InputText.Icon>
              <InputText.Input
                id="password"
                name="password"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                required={true}
              ></InputText.Input>
              <IconToggle
                className="md:border-b-gray-800 md:border-b"
                onClick={handleShowPassword}
              >
                <Eye weight="bold" className="h-5 w-5 text-gray-800" />
                <EyeSlash weight="bold" className="h-5 w-5 text-gray-800" />
              </IconToggle>
            </InputText.Root>
            <Text
              asChild
              size="sm"
              className="underline text-gray-400 hover:text-gray-200 text-right mr-3 -mt-5"
            >
              <Link to="/app/request-reset-password">Esqueci minha senha</Link>
            </Text>

            <Button
              type="submit"
              className="mt-4 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm"></LoadingSpinner>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <footer className="flex flex-col w-full lg:px-5 justify-start mt-8 mb-16">
            <Text
              size="sm"
              className=" text-gray-400 hover:text-gray-200 text-left"
            >
              Ainda não possui uma conta?
            </Text>
            <Text
              asChild
              size="sm"
              className="underline text-gray-400 hover:text-gray-200 text-left max-w-fit"
            >
              <Link to="">Crie uma agora.</Link>
            </Text>
          </footer>
        </div>
        <div>
          <BaseError
            errorMessage={errorMessage}
            handleClick={onReturn}
          ></BaseError>
        </div>
      </Carousel>
    </BaseWrapper>
  );
}
