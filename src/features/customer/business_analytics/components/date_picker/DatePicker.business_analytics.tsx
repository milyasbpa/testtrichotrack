import { useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import DateRangeInputBusinessAnalytics from "../date_range_input/DateRangeInput.business_analytics";
import DateRangePickerBusinessAnalytics from "../date_range_picker/DateRangePicker.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export interface IDatePickerBusinessAnalyticsProps {
  startDate?: string;
  endDate?: string;
  disabledFuture?: boolean;
  resolution?: string;
  numberOfResolution?: number;
  onPickDate?: (data: { startDate: string; endDate: string }) => void;
}

export const DatePickerBusinessAnalytics = ({
  startDate = moment().subtract(7, "days").format("YYYY-MM-DD"),
  endDate = moment().format("YYYY-MM-DD"),
  // disabledFuture = false,
  resolution = "day",
  numberOfResolution = 30,
  onPickDate = () => {},
}: IDatePickerBusinessAnalyticsProps) => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);

  const [calendarClickPosition, setCalendarClickPosition] = useState<
    "start" | "end"
  >("end");

  const [startDateInput, setStartDateInput] = useState(startDate);
  const [endDateInput, setEndDateInput] = useState(endDate);

  const handlePickDateRangeFromCalendar = (data: {
    startDate: string;
    endDate: string;
  }) => {
    setStartDateValue(data.startDate);
    setEndDateValue(data.endDate);
  };

  const handleClickApply = () => {
    if (onPickDate) {
      onPickDate({
        startDate: String(startDateValue),
        endDate: String(endDateValue),
      });
    }
  };

  const handleClickReset = () => {
    if (onPickDate) {
      onPickDate({
        startDate:
          resolution === "month"
            ? moment().subtract(1, "year").format("YYYY-MM-DD")
            : resolution === "week"
            ? moment().subtract(1, "month").format("YYYY-MM-DD")
            : moment().subtract(7, "day").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      });
    }
  };

  const handleChangeStartDateFromInput = (date: string) => {
    setStartDateInput(date);
  };

  const handleChangeEndDateFromInput = (date: string) => {
    setEndDateInput(date);
  };

  const isStartDayInputLengthFit = startDateInput?.split("-")[2]?.length === 2;
  const isStartMonthInputLengthFit =
    startDateInput?.split("-")[1]?.length === 2;
  const isStartYearInputLengthFit = startDateInput?.split("-")[0]?.length === 4;
  const isStartDateInputAfterToday = moment(startDateInput).isAfter(
    moment().format("YYYY-MM-DD"),
    "day"
  );
  const isStartDateInputValidDate = moment(startDateInput).isValid();
  const isStartDateInputBiggerThanEndDate = moment(
    moment(startDateInput).format("YYYY-MM-DD")
  ).isAfter(moment(endDateInput).format("YYYY-MM-DD"), "day");
  const isStartDateInputLessThanDayResolution = moment(
    moment(startDateInput).format("YYYY-MM-DD")
  ).isBefore(
    moment(endDateInput)
      .subtract(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );

  const isEndDayInputLengthFit = endDateInput?.split("-")[2]?.length === 2;
  const isEndMonthInputLengthFit = endDateInput?.split("-")[1]?.length === 2;
  const isEndYearInputLengthFit = endDateInput?.split("-")[0]?.length === 4;
  const isEndDateInputAfterToday = moment(endDateInput).isAfter(
    moment().format("YYYY-MM-DD"),
    "day"
  );
  const isEndDateInputValidDate = moment(endDateInput).isValid();
  const isEndDateInputSmallerThanStartDate = moment(
    moment(endDateInput).format("YYYY-MM-DD")
  ).isBefore(moment(startDateInput).format("YYYY-MM-DD"), "day");
  const isEndDateInputMoreThanDayResolution = moment(
    moment(endDateInput).format("YYYY-MM-DD")
  ).isAfter(
    moment(startDateInput)
      .add(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );

  const handleClickPositionFromCalendar = (position: "start" | "end") => {
    setCalendarClickPosition(position);
  };

  const isInputError =
    !isStartDayInputLengthFit ||
    !isStartMonthInputLengthFit ||
    !isStartYearInputLengthFit ||
    isStartDateInputAfterToday ||
    !isStartDateInputValidDate ||
    !isEndDayInputLengthFit ||
    !isEndMonthInputLengthFit ||
    !isEndYearInputLengthFit ||
    isEndDateInputAfterToday ||
    !isEndDateInputValidDate ||
    isStartDateInputBiggerThanEndDate ||
    isStartDateInputLessThanDayResolution ||
    isEndDateInputSmallerThanStartDate ||
    isEndDateInputMoreThanDayResolution;

  const isCalendarNotFinishedSelected = calendarClickPosition === "start";

  const isApplyButtonDisabled = isInputError || isCalendarNotFinishedSelected;

  // set real date
  useEffect(() => {
    if (!isInputError) {
      setStartDateValue(startDateInput);
      setEndDateValue(endDateInput);
    }
  }, [isInputError]);

  useEffect(() => {
    if (startDate && endDate) {
      setStartDateValue(startDate);
      setEndDateValue(endDate);
    }
  }, [startDate, endDate]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full",
        "bg-eerie-black"
      )}
    >
      {/* input */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full",
          "px-[1rem] py-[1rem]"
        )}
      >
        <DateRangeInputBusinessAnalytics
          startDate={startDateValue}
          endDate={endDateValue}
          disableFuture={true}
          numberOfResolution={numberOfResolution}
          resolution={resolution}
          onChangeStartDate={handleChangeStartDateFromInput}
          onChangeEndDate={handleChangeEndDateFromInput}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-x-[1rem]",
          "py-[1rem] px-[1rem]"
        )}
      >
        <DateRangePickerBusinessAnalytics
          startDate={startDateValue}
          endDate={endDateValue}
          disableFuture={true}
          numberOfResolution={numberOfResolution}
          resolution={resolution}
          onPickDate={handlePickDateRangeFromCalendar}
          onGetClickPosition={handleClickPositionFromCalendar}
        />
      </div>

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-end justify-items-end w-full gap-x-[1rem]",
          "px-[1rem] py-[1rem]"
        )}
      >
        <button
          className={clsx(
            "border border-dartmouth-green disabled:border disabled:border-granite-gray",
            "bg-dartmouth-green disabled:bg-granite-gray",
            "rounded-[0.5rem]",
            "px-[1rem] py-[0.75rem]",
            "cursor-pointer disabled:cursor-default",
            "text-white disabled:text:white",
            "font-bold text-[1rem] uppercase"
          )}
          disabled={isApplyButtonDisabled}
          onClick={handleClickApply}
        >
          {dictionaries.date_filter.actions.apply}
        </button>

        <button
          className={clsx(
            "border border-philippine-green",
            "bg-transparent",
            "rounded-[0.5rem]",
            "px-[1rem] py-[0.75rem]",
            "cursor-pointer",
            "text-dartmouth-green font-bold text-[1rem] uppercase"
          )}
          onClick={handleClickReset}
        >
          {dictionaries.date_filter.actions.reset}
        </button>
      </div>
    </div>
  );
};
