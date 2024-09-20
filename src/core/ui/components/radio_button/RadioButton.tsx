import clsx from "clsx";
import { useRef } from "react";
import { Button } from "../button";

export interface RadioButtonProps extends React.HTMLProps<HTMLInputElement> {}

export const RadioButton = ({
  label = "",
  checked = false,
  disabled = false,
  ...otherProps
}: RadioButtonProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <Button
      variant={checked ? "contained" : "outlined"}
      disabled={disabled}
      className={clsx(
        "!justify-start justify-items-start",
        !checked && "!border-[white]"
      )}
      onClick={() => {
        if (!!ref.current) {
          ref.current.click();
        }
      }}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          "w-[1.25rem] h-[1.25rem]",
          "border-[1.5px] border-[white]",
          "rounded-[50%]",
          "bg-transparent"
        )}
      >
        <div
          className={clsx(
            "w-[0.5rem] h-[0.5rem]",
            "rounded-[50%]",
            checked ? "bg-white" : "bg-transparent"
          )}
        />
      </div>
      <span
        className={clsx(
          checked
            ? "text-[white] font-bold text-[1rem]"
            : "text-[#FFFFFF91] font-normal text-[1rem]"
        )}
      >
        {label}
      </span>
      <input
        {...otherProps}
        ref={ref}
        checked={checked}
        disabled={disabled}
        type="radio"
        className={"sr-only"}
      />
    </Button>
  );
};
