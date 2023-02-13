import { ReactNode } from "react";
import { AuthImage } from "@pages/public/authentication/AuthImage";

export interface IBaseWrapperProps {
  children: ReactNode;
}

export function BaseWrapper({ children }: IBaseWrapperProps) {
  return (
    <div className="w-full h-screen 2xl:pt-16 2xl:pb-28 2xl:px-28 lg:pb-14 lg:px-14 py-1  px-1 bg-gray-100">
      <div className="lg:table lg:m-auto flex h-full w-full items-start justify-center drop-shadow-md border border-gray-100">
        <div className="lg:table-cell w-3/5 lg:pt-6 lg:pb-0 bg-blue-600 hidden max-h-min align-middle">
          <div className="lg:flex items-center justify-center absolute top-3 left-3 hidden bg-gray-800 w-36 h-12 text-center">
            Logo
          </div>
          <AuthImage className="block m-auto mb-20" />
        </div>
        <div className="table-cell mx-auto   w-full lg:w-2/5 bg-gray-900 text-gray-100 align-middle">
          {children}
        </div>
      </div>
    </div>
  );
}
