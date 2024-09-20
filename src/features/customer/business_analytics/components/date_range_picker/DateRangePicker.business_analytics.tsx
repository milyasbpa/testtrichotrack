import { useState, useMemo } from "react";
import clsx from "clsx";
import moment from "moment";
import { DayNamesBoxBusinessAnalytics } from "../day_names_box/DayNamesBox.business_analytics";
import SVGIcon from "src/core/ui/icons";

const generateList = (date: string | Date, month: string) => {
  let dateArr: string[] = [];
  const startNumberDay: number = moment(date)
    .startOf("month")
    .diff(moment().startOf("month").startOf("week"), "days");

  const dayInMonth = parseInt(moment(date).endOf("month").format("DD"));
  const endNumberDay: number = moment()
    .endOf("month")
    .endOf("week")
    .diff(moment(date).endOf("month"), "days");

  for (let i = 0; i < startNumberDay + dayInMonth + endNumberDay; i++) {
    const condition =
      moment(moment(date).startOf("month").startOf("week"), "DD-MM-YYYY")
        .add(i, "days")
        .format("MMMM") !== month
        ? moment(moment(date).startOf("month").startOf("week"), "DD-MM-YYYY")
            .add(i, "days")
            .format("YYYY-MM-DD")
        : moment(moment(date).startOf("month").startOf("week"), "DD-MM-YYYY")
            .add(i, "days")
            .format("YYYY-MM-DD");
    dateArr = [...dateArr, condition];
  }
  return dateArr;
};

const leftMonthInitial =
  parseInt(moment().format("M")) % 2 === 1
    ? `${moment().format("YYYY-MM")}-01`
    : `${moment().subtract(1, "month").format("YYYY-MM")}-01`;
const rightMonthInitial =
  parseInt(moment().format("M")) % 2 === 1
    ? `${moment().add(1, "month").format("YYYY-MM")}-01`
    : `${moment().format("YYYY-MM")}-01`;

// toolkit
const checkDateIsSmallerThanLowestResolutionLimit = (
  date: string,
  referenceDate: string,
  numberOfResolution: number,
  resolution: string
) => {
  return moment(moment(date).format("YYYY-MM-DD")).isBefore(
    moment(referenceDate)
      .subtract(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );
};

const checkDateIsBiggerThanUpperResolutionLimit = (
  date: string,
  referenceDate: string,
  numberOfResolution: number,
  resolution: string
) => {
  return moment(moment(date).format("YYYY-MM-DD")).isAfter(
    moment(referenceDate)
      .add(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );
};

const checkDateIsInFuture = (date: string) => {
  return moment(moment(date).format("YYYY-MM-DD")).isAfter(
    moment().format("YYYY-MM-DD"),
    "day"
  );
};

// const checkDateIsAfterReferenceDate = (date: string, referenceDate: string) => {
//   return moment(moment(date).format("YYYY-MM-DD")).isAfter(
//     moment(referenceDate).format("YYYY-MM-DD"),
//     "day"
//   );
// };

// const checkDateIsInPast = (date: string) => {
//   return moment(date).isBefore(moment().format("YYYY-MM-DD"), "day");
// };

const checkDateIsBeforeReferenceDate = (
  date: string,
  referenceDate: string
) => {
  return moment(date).isBefore(referenceDate, "day");
};

const checkDateIsSameWithStartDateRangeSelected = (
  date: string,
  startDate: string
) => {
  return (
    moment(date).format("YYYY-MM-DD") === moment(startDate).format("YYYY-MM-DD")
  );
};

const checkDateIsSameWithEndDateRangeSelected = (
  date: string,
  endDate: string
) => {
  return (
    moment(date).format("YYYY-MM-DD") === moment(endDate).format("YYYY-MM-DD")
  );
};

const checkDateIsInBetweenDateRangeSelected = (
  date: string,
  startDate: string,
  endDate: string
) => {
  return (
    moment(moment(date).format("YYYY-MM-DD")).isBefore(
      moment(endDate).format("YYYY-MM-DD"),
      "date"
    ) &&
    moment(moment(date).format("YYYY-MM-DD")).isAfter(
      moment(startDate).format("YYYY-MM-DD"),
      "date"
    )
  );
};

const checkDateIsNotInActiveMonth = (date: string, activeMonth: string) => {
  return moment(date).format("MMMM") !== moment(activeMonth).format("MMMM");
};

export interface IDateRangePickerBusinessAnalyticsProps {
  startDate?: string;
  endDate?: string;
  disableFuture?: boolean;
  resolution?: string;
  numberOfResolution?: number;
  onPickDate?: (data: { startDate: string; endDate: string }) => void;
  onGetClickPosition?: (position: "start" | "end") => void;
}

DateRangePickerBusinessAnalytics.defaultProps = {
  startDate: "",
  endDate: "",
  disableFuture: false,
  resolution: "day",
  numberOfResolution: 30,
};

export default function DateRangePickerBusinessAnalytics(
  props: IDateRangePickerBusinessAnalyticsProps
) {
  // const { translateMonthName } = useTranslateMonth();
  const [clickPosition, setClickPosition] = useState<"start" | "end">("end");

  const startDate = props.startDate ?? "";
  const endDate = props.endDate ?? "";

  const [leftMonth, setLeftMonth] = useState<string>(leftMonthInitial);
  const [rightMonth, setRightMonth] = useState<string>(rightMonthInitial);

  const leftDateList = useMemo(() => {
    return generateList(
      `${moment(leftMonth).format("YYYY")}-${moment(leftMonth).format(
        "MM"
      )}-01`,
      moment(leftMonth).format("MMMM")
    );
  }, [leftMonth]);

  const rightDateList = useMemo(() => {
    return generateList(
      `${moment(rightMonth).format("YYYY")}-${moment(rightMonth).format(
        "MM"
      )}-01`,
      moment(rightMonth).format("MMMM")
    );
  }, [rightMonth]);

  const handleSubtractMonth = () => {
    const previousLeftMonth = moment(leftMonth).subtract(2, "month");
    const previousRightMonth = moment(rightMonth).subtract(2, "month");
    setLeftMonth(previousLeftMonth.format("YYYY-MM-DD"));
    setRightMonth(previousRightMonth.format("YYYY-MM-DD"));
  };

  const handleAddMonth = () => {
    const nextLeftMonth = moment(leftMonth).add(2, "month");
    const nextRightMonth = moment(rightMonth).add(2, "month");
    setLeftMonth(nextLeftMonth.format("YYYY-MM-DD"));
    setRightMonth(nextRightMonth.format("YYYY-MM-DD"));
  };

  const handleClickDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newDate = `${moment(e.currentTarget.value).format("YYYY-MM-DD")}`;
    const newClickPosition = clickPosition == "start" ? "end" : "start";
    setClickPosition(newClickPosition);
    if (props.onGetClickPosition) {
      props.onGetClickPosition(newClickPosition);
    }
    if (props.onPickDate && startDate && endDate) {
      props.onPickDate({
        startDate: clickPosition === "start" ? startDate : newDate,
        endDate: clickPosition === "start" ? newDate : endDate,
      });
    }
  };

  // const leftMonthActiveName = translateMonthName(
  //   moment(leftMonth).format("MMMM")
  // );
  // const rightMonthActiveName = translateMonthName(
  //   moment(rightMonth).format("MMMM")
  // );
  const leftMonthActiveName = moment(leftMonth).format("MMMM");

  const rightMonthActiveName = moment(rightMonth).format("MMMM");

  return (
    <div
      className={clsx(
        "grid grid-cols-2 w-full place-content-start place-items-start gap-x-[1rem]",
        "bg-eerie-black"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1rem]"
        )}
      >
        <div className={clsx("flex items-center justify-between w-full")}>
          <button className={clsx("rotate-90")} onClick={handleSubtractMonth}>
            <SVGIcon
              name="Chevron"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-go-green")}
            />
          </button>

          <p className={clsx("text-[1rem] text-white font-bold")}>
            {leftMonthActiveName}
          </p>

          <div />
        </div>

        <DayNamesBoxBusinessAnalytics />

        {/* date */}
        <div className={clsx("grid grid-cols-7 w-full")}>
          {leftDateList.map((date) => {
            return (
              <button
                key={date}
                className={clsx(
                  "flex items-center justify-center",
                  "w-[40px] h-[40px]",
                  checkDateIsNotInActiveMonth(date, leftMonth)
                    ? "bg-transparent"
                    : checkDateIsSameWithStartDateRangeSelected(date, startDate)
                    ? "rounded-tl-[0.5rem] rounded-bl-[0.5rem] bg-go-green"
                    : clickPosition === "end" &&
                      checkDateIsSameWithEndDateRangeSelected(date, endDate)
                    ? "rounded-tr-[0.5rem] rounded-br-[0.5rem] bg-go-green"
                    : clickPosition === "end" &&
                      checkDateIsInBetweenDateRangeSelected(
                        date,
                        startDate,
                        endDate
                      )
                    ? "bg-go-green-08"
                    : "bg-transparent"
                )}
                disabled={
                  clickPosition === "start" &&
                  checkDateIsBeforeReferenceDate(date, startDate)
                    ? true
                    : checkDateIsSmallerThanLowestResolutionLimit(
                        date,
                        endDate,
                        props.numberOfResolution || 30,
                        props.resolution || "day"
                      )
                    ? true
                    : checkDateIsBiggerThanUpperResolutionLimit(
                        date,
                        startDate,
                        props.numberOfResolution || 0,
                        props.resolution || "day"
                      )
                    ? true
                    : props.disableFuture && checkDateIsInFuture(date)
                    ? true
                    : checkDateIsNotInActiveMonth(date, leftMonth)
                }
                value={date}
                onClick={handleClickDate}
              >
                <p
                  className={clsx(
                    "text-[0.75rem] leading-[0.875rem]",
                    clickPosition === "start" &&
                      checkDateIsBeforeReferenceDate(date, startDate)
                      ? "font-normal text-granite-gray"
                      : checkDateIsSmallerThanLowestResolutionLimit(
                          date,
                          endDate,
                          props.numberOfResolution || 1,
                          props.resolution || "day"
                        )
                      ? "font-normal text-granite-gray"
                      : checkDateIsBiggerThanUpperResolutionLimit(
                          date,
                          startDate,
                          props.numberOfResolution || 0,
                          props.resolution || "day"
                        )
                      ? "font-normal text-granite-gray"
                      : props.disableFuture && checkDateIsInFuture(date)
                      ? "font-normal text-granite-gray"
                      : checkDateIsNotInActiveMonth(date, leftMonth)
                      ? "font-normal text-granite-gray"
                      : checkDateIsSameWithStartDateRangeSelected(
                          date,
                          startDate
                        )
                      ? "font-bold text-white"
                      : checkDateIsSameWithEndDateRangeSelected(date, endDate)
                      ? "font-bold text-white"
                      : checkDateIsInBetweenDateRangeSelected(
                          date,
                          startDate,
                          endDate
                        )
                      ? "font-bold text-white"
                      : "font-normal text-white"
                  )}
                >
                  {parseInt(moment(date).format("DD")).toString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1rem]"
        )}
      >
        <div className={clsx("flex items-center justify-between w-full")}>
          <div />

          <p
            className={clsx(
              "text-[1rem]",
              props.disableFuture && checkDateIsInFuture(rightMonth)
                ? "text-granite-gray font-normal"
                : "text-white font-bold"
            )}
          >
            {rightMonthActiveName}
          </p>

          <button
            className={clsx("-rotate-90")}
            disabled={
              props.disableFuture && checkDateIsInFuture(rightMonth)
                ? true
                : false
            }
            onClick={handleAddMonth}
          >
            <SVGIcon
              name="Chevron"
              className={clsx(
                "w-[1.25rem] h-[1.25rem]",
                props.disableFuture && checkDateIsInFuture(rightMonth)
                  ? "fill-granite-gray"
                  : "fill-go-green"
              )}
            />
          </button>
        </div>

        <DayNamesBoxBusinessAnalytics />

        {/* date */}
        <div className={clsx("grid grid-cols-7 w-full")}>
          {rightDateList.map((date) => {
            return (
              <button
                key={date}
                className={clsx(
                  "flex items-center justify-center",
                  "w-[40px] h-[40px]",
                  checkDateIsNotInActiveMonth(date, rightMonth)
                    ? "bg-transparent"
                    : checkDateIsSameWithStartDateRangeSelected(date, startDate)
                    ? "rounded-tl-[0.5rem] rounded-bl-[0.5rem] bg-go-green"
                    : clickPosition === "end" &&
                      checkDateIsSameWithStartDateRangeSelected(date, endDate)
                    ? "rounded-tr-[0.5rem] rounded-br-[0.5rem] bg-go-green"
                    : clickPosition === "end" &&
                      checkDateIsInBetweenDateRangeSelected(
                        date,
                        startDate,
                        endDate
                      )
                    ? "bg-go-green-08"
                    : ""
                )}
                disabled={
                  clickPosition === "start" &&
                  checkDateIsBeforeReferenceDate(date, startDate)
                    ? true
                    : checkDateIsSmallerThanLowestResolutionLimit(
                        date,
                        endDate,
                        props.numberOfResolution || 30,
                        props.resolution || "day"
                      )
                    ? true
                    : checkDateIsBiggerThanUpperResolutionLimit(
                        date,
                        startDate,
                        props.numberOfResolution || 0,
                        props.resolution || "day"
                      )
                    ? true
                    : props.disableFuture && checkDateIsInFuture(date)
                    ? true
                    : checkDateIsNotInActiveMonth(date, rightMonth)
                }
                value={date}
                onClick={handleClickDate}
              >
                <p
                  className={clsx(
                    "text-[0.75rem] leading-[0.875rem]",
                    clickPosition === "start" &&
                      checkDateIsBeforeReferenceDate(date, startDate)
                      ? "font-normal text-granite-gray"
                      : checkDateIsSmallerThanLowestResolutionLimit(
                          date,
                          startDate,
                          props.numberOfResolution || 1,
                          props.resolution || "day"
                        )
                      ? "font-normal text-granite-gray"
                      : checkDateIsBiggerThanUpperResolutionLimit(
                          date,
                          startDate,
                          props.numberOfResolution || 0,
                          props.resolution || "day"
                        )
                      ? "font-normal text-granite-gray"
                      : props.disableFuture && checkDateIsInFuture(date)
                      ? "font-normal text-granite-gray"
                      : checkDateIsNotInActiveMonth(date, rightMonth)
                      ? "font-normal text-granite-gray"
                      : checkDateIsSameWithStartDateRangeSelected(
                          date,
                          startDate
                        )
                      ? "font-bold text-white"
                      : checkDateIsSameWithEndDateRangeSelected(date, endDate)
                      ? "font-bold text-white"
                      : checkDateIsInBetweenDateRangeSelected(
                          date,
                          startDate,
                          endDate
                        )
                      ? "font-bold text-white"
                      : "font-normal text-white"
                  )}
                >
                  {parseInt(moment(date).format("DD")).toString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
