import * as React from "react";
import clsx from "clsx";

export interface TimelineCardCustomerRecordProps {
  id?: string;
  date?: string;
  checked?: boolean;
  value?: number;
  onClick?: (value: number) => void;
}

export const TimelineCardCustomerRecord = ({
  id = "",
  date = "",
  checked = false,
  value = 0,
  onClick = () => {},
}: TimelineCardCustomerRecordProps) => {
  const handleClickTimestamp = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(parseInt(e.currentTarget.value));
  };
  return (
    <button
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
        "rounded-[1rem]",
        "min-w-[194px] h-[48px]",
        "box-border",
        checked ? "bg-philippine-green" : "bg-eerie-black",
        checked
          ? "border-[2px] border-philippine-green"
          : "border-[2px] border-charleston-green"
      )}
      value={value}
      onClick={handleClickTimestamp}
    >
      <p
        className={clsx("text-[0.875rem] text-white font-semibold text-center")}
      >
        {date}
      </p>
    </button>
  );
};
