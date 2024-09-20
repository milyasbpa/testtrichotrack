import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import clsx from "clsx";

export interface TooltipProps {
  id?: string;
  children?: React.ReactNode;
}

export const Tooltip = ({ id, children }: TooltipProps) => {
  return (
    <ReactTooltip
      id={id}
      className={clsx(
        "bg-eerie-black",
        "rounded-[0.5rem]",
        "p-[0.75rem]",
        "grid grid-flow-col place-content-start place-items-start gap-x-[0.5rem]",
        "z-10",
        "max-w-[400px]"
      )}
    >
      {children}
    </ReactTooltip>
  );
};
