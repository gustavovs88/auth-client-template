import { ArrowLeft, At, Eye, EyeSlash, Lock } from "phosphor-react";
import { useCallback, useState } from "react";
import { Button } from "@components/globals/Button";
import { InputText } from "@components/globals/InputText";
import { LoadingSpinner } from "@components/globals/LoadingSpinner";
import { Text } from "@components/globals/Text";
import { Link, useLocation } from "react-router-dom";
import { Heading } from "@components/globals/Heading";
import Carousel, { ScrollMode } from "nuka-carousel";
import { BaseWrapper } from "@components/pages/public/authentication/BaseWrapper";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import { BaseError } from "@pages/public/authentication/BaseError";
import AuthApi, {
  IRequestResetPasswordParams,
} from "@services/api/authentication/AuthApi";

export function RequestResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [slideDisplay, setSlideDisplay] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState("");
  const onSuccess = useCallback(() => {
    setSlideDisplay("flex");
    setCurrentView(1);
  }, []);
  const onError = useCallback(() => {
    setSlideDisplay("hidden");
    setCurrentView(2);
  }, []);
  const onReturn = useCallback(() => {
    setIsLoading(false);
    setCurrentView(0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    if (isValid) {
      const formData = new FormData(formElement);
      const postData = Object.fromEntries(
        formData.entries()
      ) as unknown as IRequestResetPasswordParams;
      try {
        const resetPassword = await AuthApi.requestResetPassword(postData);
        if ("error" in resetPassword) {
          setErrorMessage(resetPassword.error.message.formatted);
        } else {
          onSuccess();
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage("Erro inesperado. Tente novamente  mais tarde");
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
        scrollMode={ScrollMode.page}
      >
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto p-4 2xl:max-w-md mt-10 gap-2">
          <header className="lg:mt-20 flex flex-col items-start justify-start w-full mb-10">
            <div className="flex items-center justify-center relative -top-4 -left-4 lg:hidden bg-gray-800 w-36 h-12 text-center">
              Logo
            </div>
            <div className="flex items-center lg:relative lg:-top-10 absolute bottom-0 gap-2">
              <Link to="/app/login" className="flex items-center gap-2">
                <ArrowLeft size={24} weight="bold" className="text-gray-800" />
                <Text>Login</Text>
              </Link>
            </div>
            <Heading size="lg" className="text-left">
              Esqueceu sua senha?
            </Heading>
            <Text size="md">
              Não tem problema! Para recuperá-la basta você preencher abaixo o
              endereço de e-mail vinculado ao cadastrado da sua conta.
            </Text>
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

            <Button
              type="submit"
              className="mt-4 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm"></LoadingSpinner>
              ) : (
                "Recuperar minha senha"
              )}
            </Button>
          </form>
          <footer className="flex flex-col w-full lg:px-5 justify-start mt-8 mb-4">
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
          <ResetPasswordSuccess
            successMessage="Caso o e-mail informado esteja no nosso cadastro, você o receberá em até 5 minutos"
            handleClick={onReturn}
            className={slideDisplay}
          ></ResetPasswordSuccess>
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
