import {
  Checkbox as CheckboxComponent,
  CheckboxProps as CheckboxComponentProps,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import SVGIcon from "../../icons";
import { useRef } from "react";

export interface CheckboxButtonProps extends CheckboxComponentProps {
  variant?: "primary" | "secondary";
  label?: string;
}

export const CheckboxButton = ({
  variant = "primary",
  label = "",
  ...otherProps
}: CheckboxButtonProps) => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <Field
      className={clsx(
        "grid grid-flow-col gap-[0.5rem] items-center content-center justify-start justify-items-start",
        "w-full h-[3rem]",
        "rounded-[0.5rem]",
        otherProps.checked
          ? "border border-[#017747]"
          : "border border-[rgba(255,255,255,0.54)]",
        otherProps.checked ? "bg-[#017747]" : "bg-transparent",
        "px-[1rem] py-[0.75rem]"
      )}
      onClick={() => {
        if (!!ref.current) {
          ref.current.click();
        }
      }}
    >
      <CheckboxComponent
        {...otherProps}
        ref={ref}
        className={clsx(
          "outline-none",
          "w-[1.5rem] h-[1.5rem]",
          otherProps.checked ? "bg-[white]" : "bg-transparent",
          otherProps.checked
            ? "border-[3px] border-[white]"
            : "border-[3px] border-[rgba(255,255,255,0.54)]",
          "rounded-[0.25rem]",
          "flex items-center justify-center"
        )}
      >
        <SVGIcon
          name="Check"
          className={clsx(
            "w-[1rem] h-[1rem]",
            "fill-[#017948]",
            otherProps.checked ? "opacity-100" : "opacity-0"
          )}
        />
      </CheckboxComponent>
      {!!label.length && (
        <Label className={clsx("text-[1rem] font-bold text-white", "w-full")}>
          {label}
        </Label>
      )}
    </Field>
  );
};
