import { ArrowLeft, Eye, EyeSlash, Lock } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@components/globals/Button";
import { InputText } from "@components/globals/InputText";
import { LoadingSpinner } from "@components/globals/LoadingSpinner";
import { Text } from "@components/globals/Text";
import Fetch from "@utils/fetchClient/fetch";
import { Link, redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Heading } from "@components/globals/Heading";
import Carousel, { ScrollMode } from "nuka-carousel";
import { BaseWrapper } from "@components/pages/public/authentication/BaseWrapper";
import { ResetPasswordSuccess } from "@pages/public/authentication/resetPassword/requestResetPassword/ResetPasswordSuccess";
import { BaseError } from "@pages/public/authentication/BaseError";
import decodeJWTToken from "@utils/jwt/jwt";
import { IDecodedAuthToken } from "../../AuthProvider";
import { IconToggle } from "@components/globals/IconToggle";

export function ResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCOnfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [slideDisplay, setSlideDisplay] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState("");
  const token = searchParams.get("token");
  const decodedToken = decodeJWTToken<IDecodedAuthToken>(token);
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    setSlideDisplay("flex");
    setCurrentView(1);
  }, []);
  const onError = useCallback((url?: string) => {
    setSlideDisplay("hidden");
    setCurrentView(2);
  }, []);

  useEffect(() => {
    if (!decodedToken) {
      setTimeout(() => {
        setErrorMessage(
          "O link para atualização da senha expirou ou está incorreto, por favor reinicie o processo."
        );
        onError();
      }, 500);
    }
  }, []);

  const loginRedirect = useCallback(() => {
    return navigate("/app/login");
  }, []);

  const onReturn = useCallback(() => {
    if (!decodedToken) {
      return navigate("/app/request-reset-password");
    }
    setIsLoading(false);
    setCurrentView(0);
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPassword = () => {
    setShowCOnfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const postData = Object.fromEntries(formData.entries());
    if (postData.password !== postData.confirmPassword) {
      const inputs = formElement.elements;
      const confirmPasswordInput = inputs[1] as HTMLInputElement;
      confirmPasswordInput.setCustomValidity(
        "A senha e a confirmação são diferentes."
      );
    }
    const isValid = formElement.checkValidity();

    if (isValid) {
      try {
        const updatePassword = await Fetch.put("api/v1/customer/password", {
          password: postData.password,
          resetPasswordToken: token,
        });
        if (updatePassword?.error) {
          setErrorMessage(updatePassword.error.message.formatted);
        } else {
          onSuccess();
          setIsLoading(false);
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
              Olá {decodedToken?.customerName || ""}
            </Heading>
            <Text size="md">
              Para recuperar/criar uma nova senha basta você preencher abaixo:
            </Text>
          </header>

          <form
            className="flex flex-col w-full"
            noValidate
            onSubmit={handleSubmit}
          >
            <InputText.Root>
              <InputText.Icon>
                <Lock weight="fill" />
              </InputText.Icon>
              <InputText.Input
                id="password"
                name="password"
                placeholder="Nova senha"
                type={showPassword ? "text" : "password"}
                required={true}
                minLength={8}
              ></InputText.Input>
              <IconToggle
                className="md:border-b-gray-800 md:border-b"
                onClick={handleShowPassword}
              >
                <Eye weight="bold" className="h-5 w-5 text-gray-800" />
                <EyeSlash weight="bold" className="h-5 w-5 text-gray-800" />
              </IconToggle>
            </InputText.Root>

            <InputText.Root>
              <InputText.Icon>
                <Lock weight="fill" />
              </InputText.Icon>
              <InputText.Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar a nova senha"
                type={showConfirmPassword ? "text" : "password"}
                required={true}
              ></InputText.Input>
              <IconToggle
                className="md:border-b-gray-800 md:border-b"
                onClick={handleConfirmPassword}
              >
                <Eye weight="bold" className="h-5 w-5 text-gray-800" />
                <EyeSlash weight="bold" className="h-5 w-5 text-gray-800" />
              </IconToggle>
            </InputText.Root>

            <Button
              type="submit"
              className="mt-4 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm"></LoadingSpinner>
              ) : (
                "Recuperar"
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
            successMessage="Sua senha foi alterada com sucesso."
            handleClick={loginRedirect}
            className={slideDisplay}
          ></ResetPasswordSuccess>
        </div>
        <div>
          <BaseError
            errorMessage={errorMessage}
            handleClick={onReturn}
            buttonAction={
              decodedToken ? "Voltar" : "Solicitar atualização de senha"
            }
          ></BaseError>
        </div>
      </Carousel>
    </BaseWrapper>
  );
}
