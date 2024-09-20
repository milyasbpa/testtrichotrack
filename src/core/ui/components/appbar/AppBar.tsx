import * as React from "react";
import clsx from "clsx";

export interface AppBarProps {
  children?: React.ReactNode;
  startAddornment?: React.ReactNode;
  endAddornment?: React.ReactNode;
}

export const AppBar = ({
  children,
  startAddornment,
  endAddornment,
}: AppBarProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr_auto]",
        "h-[124px]",
        "fixed top-0 left-0 right-0",
        "px-[2rem]",
        "z-[40]"
      )}
      style={{
        background:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)), #121212",
      }}
    >
      {startAddornment && (
        <div className={clsx("grid justify-start justify-items-start", "grid")}>
          {startAddornment}
        </div>
      )}

      {children && (
        <div className={clsx("grid justify-center justify-items-center")}>
          {children}
        </div>
      )}

      {endAddornment && (
        <div
          className={clsx(
            "grid grid-cols-1 justify-end justify-items-end",
            "w-full"
          )}
        >
          {endAddornment}
        </div>
      )}
    </div>
  );
};
