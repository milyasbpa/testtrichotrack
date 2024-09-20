import * as React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: "1" | "2" | "3";
}

export const Card = ({
  children,
  elevation = "1",
  className,
  ...otherProps
}: CardProps) => {
  return (
    <div
      {...otherProps}
      className={clsx(
        "w-full",
        elevation === "3"
          ? "bg-[#262626]"
          : elevation === "2"
          ? "bg-[#1B1B1B]"
          : "bg-[#262626]",
        "rounded-[1.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
};
