import {
  Checkbox as CheckboxComponent,
  CheckboxProps as CheckboxComponentProps,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";
import SVGIcon from "../../icons";

export interface CheckboxProps extends CheckboxComponentProps {
  variant?: "primary" | "secondary";
  label?: string;
}

export const Checkbox = ({
  variant = "primary",
  label = "",
  ...otherProps
}: CheckboxProps) => {
  const ref = useRef<HTMLElement | null>(null);
  return (
    <Field
      className={clsx(
        "grid grid-flow-col gap-[0.5rem] justify-start justify-items-start"
      )}
      onClick={() => {
        if (!!ref.current) {
          ref.current.click();
        }
      }}
    >
      <CheckboxComponent
        {...otherProps}
        className={clsx(
          "outline-none",
          "w-[1.5rem] h-[1.5rem]",
          otherProps.checked ? "bg-[#017948]" : "bg-transparent",
          otherProps.checked
            ? "border-[3px] border-[#017948]"
            : "border-[3px] border-[rgba(255,255,255,0.54)]",
          "rounded-[0.25rem]",
          "flex items-center justify-center"
        )}
      >
        <SVGIcon
          name="Check"
          className={clsx(
            "w-[1rem] h-[1rem]",
            "fill-[white]",
            otherProps.checked ? "opacity-100" : "opacity-0"
          )}
        />
      </CheckboxComponent>
      {!!label.length && (
        <Label className={clsx("text-[1rem] font-bold text-white")}>
          {label}
        </Label>
      )}
    </Field>
  );
};
