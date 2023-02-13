import { ErrorWarning } from "@components/globals/ErrorWarning";
import { Heading } from "@components/globals/Heading";
import { Text } from "@components/globals/Text";
import { ArrowLeft } from "phosphor-react";

interface IBaseErrorProps {
  errorMessage?: string;
  handleClick?: VoidFunction;
  buttonAction?: string;
}

export const BaseError = ({
  errorMessage,
  handleClick,
  buttonAction,
}: IBaseErrorProps) => {
  return (
    <div className="flex flex-col p-4 items-stretch w-full mx-auto lg:max-w-lg mt-10 gap-2">
      <Heading size="lg" className="text-center mb-10">
        Erro!
      </Heading>
      <ErrorWarning className="mb-52">
        {errorMessage ||
          "Tente novamente em instantes, caso o erro persista entre em contato conosco."}
      </ErrorWarning>
      <div
        onClick={handleClick}
        className="flex items-center cursor-pointer max-w-fit"
      >
        <ArrowLeft
          size={24}
          weight="bold"
          className="text-gray-800 cursor-pointer"
        />
        <Text>{buttonAction || "Voltar"}</Text>
      </div>
    </div>
  );
};
