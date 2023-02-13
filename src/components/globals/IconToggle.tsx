import clsx from "clsx";
import { ReactNode, useState } from "react";

export interface IconToggleProps {
  children: ReactNode[];
  className: string;
  onClick: VoidFunction;
}

export function IconToggle({ children, className, onClick }: IconToggleProps) {
  const [toggleStatus, setToggleStatus] = useState(true);
  const handleClick = () => {
    setToggleStatus(!toggleStatus);
    onClick();
  };
  return (
    <div
      className={clsx("w-6, h-6 p-[2px] bg-transparent", className)}
      onClick={handleClick}
    >
      {toggleStatus ? children[0] : children[1]}
    </div>
  );
}
