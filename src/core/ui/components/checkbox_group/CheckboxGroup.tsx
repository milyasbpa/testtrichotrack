import clsx from "clsx";

export interface CheckboxGroupProps {
  label?: string;
  children?: React.ReactNode;
}

export const CheckboxGroup = ({ label = "", children }: CheckboxGroupProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      {!!label.length && (
        <p className={clsx("text-[1rem] text-[white] font-bold")}>{label}</p>
      )}

      {children as React.ReactNode}
    </div>
  );
};
