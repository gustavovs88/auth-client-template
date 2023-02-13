import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
}

export function Button({
  children,
  asChild,
  className,
  ...props
}: ButtonProps) {
  const ButtonComp = asChild ? Slot : "button";

  return (
    <ButtonComp
      className={clsx(
        "text-white py-3 px-3 bg-black rounded-full font-sans text-sm w-full transition-colors hover:bg-opacity-70 focus:ring-2 ring-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </ButtonComp>
  );
}
