import { Menu, MenuButton } from "@headlessui/react";
import { useState, useRef } from "react";
import clsx from "clsx";
import {
  DatePickerBusinessAnalytics,
  IDatePickerBusinessAnalyticsProps,
} from "../date_picker/DatePicker.business_analytics";
import moment from "moment";
import { useOnClickOutside } from "usehooks-ts";
import SVGIcon from "src/core/ui/icons";

export interface DatePickerDropdownBusinessAnalyticsProps
  extends IDatePickerBusinessAnalyticsProps {
  label?: string;
}

export default function DatePickerDropdownBusinessAnalytics({
  label = "",
  onPickDate = () => {},
  ...otherProps
}: DatePickerDropdownBusinessAnalyticsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handlePickDate = (data: { startDate: string; endDate: string }) => {
    onPickDate(data);

    setOpen(false);
  };
  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.25rem]"
      )}
    >
      <p className={clsx("text-white text-[0.75rem] font-bold")}>{label}</p>
      <Menu as="div" className={clsx("relative inline-block text-left w-full")}>
        <MenuButton
          className={clsx(
            "relative w-full cursor-default rounded-lg text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
            "bg-dark-charcoal",
            "p-[1rem]",
            "flex items-center justify-between"
          )}
          onClick={handleClick}
        >
          <span
            className={clsx("text-[1rem] font-medium leading-5 text-white")}
          >
            {`${moment(otherProps.startDate).format("YYYY-MM-DD")} > ${moment(
              otherProps.endDate
            ).format("YYYY-MM-DD")}`}
          </span>

          <SVGIcon
            name="Calendar"
            className={clsx("w-[1.25rem] h-[1.25rem]", "fill-go-green")}
          />
        </MenuButton>

        {open && (
          <div
            className={clsx(
              "absolute z-100 mt-2 w-[624px] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
              "left-[50%] translate-x-[-50%]"
            )}
          >
            <DatePickerBusinessAnalytics
              {...otherProps}
              onPickDate={handlePickDate}
            />
          </div>
        )}
      </Menu>
    </div>
  );
}
