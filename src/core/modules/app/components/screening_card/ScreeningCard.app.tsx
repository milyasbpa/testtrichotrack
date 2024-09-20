import React from "react";
import clsx from "clsx";

export interface ScreeningCardAppProps {
  name?: string;
  value?: string;
  children?: React.ReactNode;
}

export const ScreeningCardApp = ({
  name = "",
  value = "",
  children,
}: ScreeningCardAppProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[0.875rem] text-white-80 font-regular")}>
            {name}
          </p>
        </div>

        <p className={clsx("text-[0.875rem] text-white font-semibold")}>
          {value}
        </p>
      </div>
      {children}
    </div>
  );
};
