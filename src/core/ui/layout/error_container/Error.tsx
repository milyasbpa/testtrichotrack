import * as React from "react";
import clsx from "clsx";

export interface ErrorContainerProps {
  children?: React.ReactNode;
}

export const ErrorContainer = ({ children }: ErrorContainerProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-start gap-[1.5rem]",
        "w-full h-full",
        "px-[1.5rem] py-[1.5rem]"
      )}
    >
      <div />
      {children}
    </div>
  );
};
