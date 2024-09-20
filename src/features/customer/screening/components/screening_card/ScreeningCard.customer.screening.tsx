import React from "react";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";
import { Tooltip } from "src/core/ui/components/tooltip";
import { Card } from "src/core/ui/components/card/Card";

export interface ScreeningCardCustomerScreeningProps {
  name?: string;
  value?: string;
  description?: string;
  children?: React.ReactNode;
}

export const ScreeningCardCustomerScreening = ({
  name = "",
  value = "",
  description = "",
  children,
}: ScreeningCardCustomerScreeningProps) => {
  return (
    <Card elevation="2" className={clsx("h-full", "!rounded-[0.5rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full",
          "px-[1rem] py-[1.25rem]",
          "border border-[rgba(255,255,255,0.12)]",
          "rounded-[0.5rem]"
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
            <SVGIcon
              name="ExclamationCircle"
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-philippine-green")}
              data-tooltip-id={name}
            />
          </div>

          <p className={clsx("text-[1rem] text-white font-semibold")}>
            {value}
          </p>

          <Tooltip id={name}>
            <SVGIcon
              name="ExclamationCircle"
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
            />
            <p
              className={clsx("text-[1rem] text-white font-regular text-left")}
            >
              {description}
            </p>
          </Tooltip>
        </div>
        {children}
      </div>
    </Card>
  );
};
