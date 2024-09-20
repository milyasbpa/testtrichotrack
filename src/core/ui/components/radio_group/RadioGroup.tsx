import {
  RadioGroup as RadioGroupComponent,
  RadioGroupProps as RadioGroupComponentProps,
} from "@headlessui/react";
import clsx from "clsx";

export interface RadioGroupProps extends RadioGroupComponentProps {
  label?: string;
}

export const RadioGroup = ({
  label = "",
  children,
  ...otherProps
}: RadioGroupProps) => {
  return (
    <RadioGroupComponent
      {...otherProps}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      {!!label.length && (
        <p className={clsx("text-[1rem] text-[white] font-bold")}>{label}</p>
      )}

      {children as React.ReactNode}
    </RadioGroupComponent>
  );
};
