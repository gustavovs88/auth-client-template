import { clsx } from "clsx";
import { ReactNode } from "react";
import { Warning } from "phosphor-react";

export interface ErrorWarningProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ErrorWarning({
  children,
  className,
  size = "md",
}: ErrorWarningProps) {
  return (
    <div
      className={clsx(
        " flex items-center text-red-800 border border-red-800 rounded font-sans py-4 px-9 ",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-lg": size === "lg",
        },
        className
      )}
    >
      <Warning className="mr-3" weight="fill" size={32} />
      {children}
    </div>
  );
}
