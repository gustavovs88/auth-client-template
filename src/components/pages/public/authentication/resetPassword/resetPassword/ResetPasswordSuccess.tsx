import { Heading } from "@components/globals/Heading";
import { SuccessWarning } from "@components/globals/SuccessWarning";
import { Text } from "@components/globals/Text";
import clsx from "clsx";
import { ArrowLeft } from "phosphor-react";
import { memo } from "react";
import { Link } from "react-router-dom";

interface IResetPasswordSuccessProps {
  successMessage: string;
  handleClick: VoidFunction;
  className?: string;
}

export const ResetPasswordSuccess = memo(function ({
  successMessage,
  handleClick,
  className,
}: IResetPasswordSuccessProps) {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 items-stretch w-full mx-auto lg:max-w-md mt-10 gap-2",
        className
      )}
    >
      <header className="mb-52">
        <Heading size="lg" className="text-center mb-10">
          Sucesso!
        </Heading>
        <SuccessWarning>{successMessage}</SuccessWarning>
      </header>
      <footer
        onClick={handleClick}
        className="flex items-center cursor-pointer max-w-fit"
      >
        <Link to="/app/login" className="flex items-center gap-2">
          <ArrowLeft size={24} weight="bold" className="text-gray-800" />
          <Text>Login</Text>
        </Link>
      </footer>
    </div>
  );
});
