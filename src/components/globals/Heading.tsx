import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export interface HeadingProps {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Heading({
  size = "md",
  children,
  asChild,
  className,
}: HeadingProps) {
  const HeadingComp = asChild ? Slot : "h2";

  return (
    <HeadingComp
      className={clsx(
        "text-black font-bold font-sans",
        {
          "text-lg": size === "sm",
          "text-xlg": size === "md",
          "text-xlg-2x": size === "lg",
        },
        className
      )}
    >
      {children}
    </HeadingComp>
  );
}
