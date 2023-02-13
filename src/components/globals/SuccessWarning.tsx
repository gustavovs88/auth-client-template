import { clsx } from "clsx";
import { ReactNode } from "react";
import { CheckCircle, Warning } from "phosphor-react";

export interface SuccessWarningProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SuccessWarning({
  children,
  className,
  size = "sm",
}: SuccessWarningProps) {
  return (
    <div
      className={clsx(
        " flex items-center text-green-800 border border-green-800 rounded font-sans py-4 px-9 ",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-lg": size === "lg",
        },
        className
      )}
    >
      <CheckCircle className="mr-3" weight="fill" size={32} />
      {children}
    </div>
  );
}
