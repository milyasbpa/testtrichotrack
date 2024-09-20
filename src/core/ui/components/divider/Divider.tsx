import clsx from "clsx";

export interface DividerProps {
  variant?: "vertical" | "horizontal";
}

export const Divider = ({ variant = "horizontal" }: DividerProps) => {
  return (
    <div
      className={clsx(
        "flex",
        "bg-[white]",
        "opacity-[0.12]",
        variant === "horizontal" ? "w-full h-[1px]" : "w-[1px] h-full"
      )}
    />
  );
};
