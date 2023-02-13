import { Slot } from "@radix-ui/react-slot";
import {
  InputHTMLAttributes,
  ReactNode,
  FormEvent,
  useState,
  memo,
} from "react";

export interface InputTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  className?: string;
  label?: string;
  errorText?: string;
  placeholder?: string;
}

export interface InputTextRootProps {
  children: ReactNode;
  errorText?: string;
}

export interface InputTextIconProps {
  children: ReactNode;
}

export interface InputTextErrorMessageProps {
  children: ReactNode;
}

function InputTextRoot({ children, errorText }: InputTextRootProps) {
  const [validationMessage, setValidationMessage] = useState<string>("");

  const onInvalid = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setValidationMessage(target.validationMessage);
  };

  const onInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setValidationMessage("");
  };

  const onBlur = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };
  return (
    <div className="h-16 py-3">
      <div
        onInvalid={onInvalid}
        onBlur={onBlur}
        onInput={onInput}
        className="py-3 pr-3 h-6 mb-1 flex items-center w-full  border-b-gray-400 border-b md:border-none"
      >
        {children}
      </div>
      {!!validationMessage && (
        <p className="text-red-800 italic text-xxs md:ml-9 ml-1  -mt-1">
          {errorText || validationMessage}
        </p>
      )}
    </div>
  );
}
InputTextRoot.displayName = "InputText.Root";

function InputTextIcon(props: InputTextIconProps) {
  return <Slot className="w-7 h-7 pb-2 text-gray-400">{props.children}</Slot>;
}

InputTextIcon.displayName = "InputText.Icon";

const InputTextInput = memo(
  ({ className, label, id, ...props }: InputTextInputProps) => {
    return (
      <input
        className="h-6 md:border-b-gray-400 md:border-b bg-transparent flex-1 pb-2 md:pl-2 outline-none text-gray-800 text-xs placeholder:text-gray-400 focus:border-gray-800 mr-0"
        {...props}
      ></input>
    );
  }
);

InputTextInput.displayName = "InputText.Input";

export const InputText = {
  Root: InputTextRoot,
  Input: InputTextInput,
  Icon: InputTextIcon,
};
