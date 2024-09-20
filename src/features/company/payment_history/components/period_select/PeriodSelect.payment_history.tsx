import * as React from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import SVGIcon from "src/core/ui/icons";

export type TimePeriodUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years";
const checkDatesIsInBetween = (
  startDate: Date | null,
  endDate: Date | null,
  currentDate: Date
) => {
  if (startDate === null || endDate === null) {
    return false;
  }
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (currentYear > startYear && currentYear < endYear) {
    return true;
  } else if (
    currentYear === startYear &&
    currentYear === endYear &&
    currentMonth >= startMonth &&
    currentMonth <= endMonth
  ) {
    return true;
  } else {
    return false;
  }
};
const compareTwoDatesIsEqual = (
  firstDate: Date | null,
  secondDate: Date | null
) => {
  if (firstDate === null || secondDate === null) {
    return false;
  }
  const firstYear = firstDate.getFullYear();
  const firstMonth = firstDate.getMonth();

  const secondYear = secondDate.getFullYear();
  const secondMonth = secondDate.getMonth();

  if (firstYear === secondYear && firstMonth === secondMonth) {
    return true;
  } else {
    return false;
  }
};

const compareDateIsBeforeThanStartDate = (
  startDate: Date | null,
  date: Date | null
) => {
  if (startDate === null || date === null) {
    return false;
  }
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const year = date.getFullYear();
  const month = date.getMonth();

  if (startYear < year) {
    return true;
  } else if (startYear === year && startMonth > month) {
    return true;
  } else {
    return false;
  }
};

const compareDateIsGreaterThanNow = (date: Date) => {
  const year = date.getFullYear();
  const firstMonth = date.getMonth();

  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth();

  if (year === yearNow && firstMonth > monthNow) {
    return true;
  } else if (year > yearNow) {
    return true;
  } else {
    return false;
  }
};

const addTimePeriod = (date: Date, unit: TimePeriodUnit, amount: number) => {
  if (!(date instanceof Date) || typeof amount !== "number") return date;
  const newDate = new Date(date);
  switch (unit) {
    case "milliseconds":
      newDate.setMilliseconds(newDate.getMilliseconds() + amount);
      break;
    case "seconds":
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
    case "minutes":
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case "hours":
      newDate.setHours(newDate.getHours() + amount);
      break;
    case "days":
      newDate.setDate(newDate.getDate() + amount);
      break;
    case "months":
      newDate.setMonth(newDate.getMonth() + amount);
      break;
    case "years":
      newDate.setFullYear(newDate.getFullYear() + amount);
      break;
  }

  return newDate;
};

const subtractTimePeriod = (
  date: Date,
  unit: TimePeriodUnit,
  amount: number
) => {
  if (!(date instanceof Date) || typeof amount !== "number") return date;
  const newDate = new Date(date);
  switch (unit) {
    case "milliseconds":
      newDate.setMilliseconds(newDate.getMilliseconds() - amount);
      break;
    case "seconds":
      newDate.setSeconds(newDate.getSeconds() - amount);
      break;
    case "minutes":
      newDate.setMinutes(newDate.getMinutes() - amount);
      break;
    case "hours":
      newDate.setHours(newDate.getHours() - amount);
      break;
    case "days":
      newDate.setDate(newDate.getDate() - amount);
      break;
    case "months":
      newDate.setMonth(newDate.getMonth() - amount);
      break;
    case "years":
      newDate.setFullYear(newDate.getFullYear() - amount);
      break;
  }

  return newDate;
};

export interface IPeriodSelectPaymentHistoryProps {
  label?: string;
  selector?: {
    counter: number;
  };
  error?: {
    is_error: boolean;
    message: string;
  };
  value?: {
    locale: "en-US" | "zh-CN";
    startDate: Date | null;
    endDate: Date | null;
  };
  calendar?: {
    isOpen: boolean;
    startDate: Date | null;
    endDate: Date | null;
    year: Date;
    locale: "en-US" | "zh-CN";
    cta: {
      primary: {
        children: React.ReactNode;
        onClick: () => void;
      };
      secondary: {
        children: React.ReactNode;
        onClick: () => void;
      };
    };
    onSelectYear: (date: Date) => void;
    onSelectMonth: (date: Date) => void;
    onClick: () => void;
    onClose: () => void;
  };
}

export const PeriodSelectPaymentHistory = ({
  label = "",
  selector = {
    counter: 1,
  },
  error = {
    is_error: false,
    message: "",
  },
  value = {
    locale: "en-US", // "en-US" | "zh-CN",
    startDate: null,
    endDate: null,
  },
  calendar = {
    isOpen: false,
    startDate: null,
    endDate: null,
    year: new Date(),
    locale: "en-US", // "en-US" | "zh-CN",
    cta: {
      primary: {
        children: "",
        onClick: () => {},
      },
      secondary: {
        children: "",
        onClick: () => {},
      },
    },
    onSelectYear: (_: Date) => {},
    onSelectMonth: (_: Date) => {},
    onClick: () => {},
    onClose: () => {},
  },
}: IPeriodSelectPaymentHistoryProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const valuePlaceholder =
    !value.startDate || !value.endDate
      ? ""
      : `${value.startDate?.toLocaleDateString(calendar.locale, {
          month: "short",
          year: "numeric",
        })} - ${value.endDate?.toLocaleDateString(calendar.locale, {
          month: "short",
          year: "numeric",
        })}`;

  useOnClickOutside(ref, () => {
    calendar.onClose();
  });

  const monthItems: Date[] = Array.from(
    { length: 12 },
    (_, i) =>
      new Date(
        `${calendar.year.toLocaleDateString("en-US", {
          year: "numeric",
        })}-${i + 1 < 10 ? `0${i + 1}` : i + 1}-01`
      )
  );

  const handleClickDropdown = () => {
    calendar.onClick();
  };

  const handleClickSelect = (date: Date) => {
    calendar.onSelectMonth(date);
  };

  const handleClickNextYear = () => {
    calendar.onSelectYear(addTimePeriod(calendar.year, "years", 1));
  };

  const handleClickPreviousYear = () => {
    calendar.onSelectYear(subtractTimePeriod(calendar.year, "years", 1));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[0.75rem] font-bold text-white")}>{label}</p>

      <div
        ref={ref}
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full",
          "relative"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col justify-between justify-items-start items-center content-center",
              "w-full",
              "px-[1rem] py-[1rem]",
              "rounded-[0.5rem]",
              "bg-[#252525]",
              error.is_error && "border border-[#E84A27]"
            )}
          >
            <p className={clsx("text-[1rem] font-medium text-white-87")}>
              {valuePlaceholder}
            </p>

            <button onClick={handleClickDropdown}>
              <SVGIcon
                name="Calendar"
                className={clsx("w-[1.25rem] h-[1.25rem]", "fill-[#01AC67]")}
              />
            </button>
          </div>
          {error.is_error && (
            <p className={clsx("text-[0.75rem] font-normal text-[#E84A27]")}>
              {error.message}
            </p>
          )}
        </div>

        {/* dropdown items */}
        {calendar.isOpen && (
          <div className={clsx("absolute", "right-0 top-[60px]", "z-[10]")}>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start",
                "rounded-[0.5rem]",
                "overflow-hidden",
                "bg-[#1F1F1F]"
              )}
            >
              {/* header */}
              <div
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-between justify-items-start",
                  "w-[332px]",
                  "box-border",
                  "px-[1rem] py-[1rem]"
                )}
              >
                <button
                  className={clsx("rotate-90")}
                  onClick={handleClickPreviousYear}
                >
                  <SVGIcon
                    name="Chevron"
                    className={clsx(
                      "w-[1.25rem] h-[1.25rem]",
                      "fill-[#01AC67]"
                    )}
                  />
                </button>

                <p className={clsx("text-[1rem] font-bold text-white")}>
                  {calendar.year.getFullYear()}
                </p>

                <button
                  className={clsx("-rotate-90")}
                  onClick={handleClickNextYear}
                >
                  <SVGIcon
                    name="Chevron"
                    className={clsx(
                      "w-[1.25rem] h-[1.25rem]",
                      "fill-[#01AC67]"
                    )}
                  />
                </button>
              </div>
              {/* end header */}
              {/* month picker */}
              <div
                className={clsx(
                  "grid grid-cols-3 items-center content-center justify-between justify-items-start",
                  "w-[332px]",
                  "box-border",
                  "px-[1rem] py-[1rem]"
                )}
              >
                {monthItems.map((item, index) => (
                  <button
                    key={index}
                    className={clsx(
                      "grid grid-cols-1 place-items-center place-content-center",
                      "w-full",
                      compareTwoDatesIsEqual(item, calendar.startDate)
                        ? "rounded-tl-[0.5rem] rounded-bl-[0.5rem]"
                        : compareTwoDatesIsEqual(item, calendar.endDate)
                        ? "rounded-tr-[0.5rem] rounded-br-[0.5rem]"
                        : "rounded-[0rem]",
                      compareTwoDatesIsEqual(item, calendar.startDate)
                        ? "bg-[#017948]"
                        : compareTwoDatesIsEqual(item, calendar.endDate)
                        ? "bg-[#017948]"
                        : checkDatesIsInBetween(
                            calendar.startDate,
                            calendar.endDate,
                            item
                          )
                        ? "bg-[rgb(1,172,103,0.4)]"
                        : "bg-[#1F1F1F]",
                      "py-[0.75rem]",
                      compareTwoDatesIsEqual(item, calendar.startDate)
                        ? "text-white font-bold"
                        : compareTwoDatesIsEqual(item, calendar.endDate)
                        ? "text-white font-bold"
                        : checkDatesIsInBetween(
                            calendar.startDate,
                            calendar.endDate,
                            item
                          )
                        ? "text-[#D8D8D8] font-normal"
                        : "text-[#D8D8D8] font-normal disabled:text-granite-gray",
                      "text-[1rem]"
                    )}
                    disabled={
                      compareDateIsGreaterThanNow(item) ||
                      (compareDateIsBeforeThanStartDate(
                        calendar.startDate,
                        item
                      ) &&
                        selector.counter === 2)
                    }
                    onClick={() => handleClickSelect(item)}
                  >
                    {item.toLocaleDateString(calendar.locale, {
                      month: "short",
                    })}
                  </button>
                ))}
              </div>
              {/* end month picker */}

              {/* start actions */}
              <div
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[1rem]",
                  "w-full",
                  "px-[1rem] py-[1rem]"
                )}
              >
                <button
                  className={clsx(
                    "bg-[#017747]",
                    "rounded-[0.5rem]",
                    "px-[1rem] py-[0.75rem]",
                    "text-[1rem] text-white font-bold uppercase"
                  )}
                  onClick={calendar.cta.primary.onClick}
                >
                  {calendar.cta.primary.children}
                </button>
                <button
                  className={clsx(
                    "border border-[#017747]",
                    "rounded-[0.5rem]",
                    "px-[1rem] py-[0.75rem]",
                    "text-[1rem] text-[#017747] font-bold uppercase"
                  )}
                  onClick={calendar.cta.secondary.onClick}
                >
                  {calendar.cta.secondary.children}
                </button>
              </div>
              {/* end actions */}
            </div>
          </div>
        )}
        {/* end dropdown item */}
      </div>
    </div>
  );
};
