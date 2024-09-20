import * as React from "react";
import clsx from "clsx";

export interface VerticalFlexGrowProps {
  children?: React.ReactNode;
}

export const VerticalFlexGrow = ({ children }: VerticalFlexGrowProps) => {
  return (
    <div
      className={clsx(
        "flex flex-grow overflow-y-auto overflow-x-hidden",
        "w-full h-full"
      )}
    >
      {children}
    </div>
  );
};
