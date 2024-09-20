import { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { DateInputBusinessAnalytics } from "../date_input/DateInput.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export interface IDateRangeInputBusinessAnalyticsProps {
  startDate?: string;
  endDate?: string;
  isError?: boolean;
  errorMessage?: string;
  numberOfResolution?: number;
  resolution?: string;
  disableFuture?: boolean;
  onChangeStartDate?: (data: string) => void;
  onChangeEndDate?: (data: string) => void;
  onErrorStartDate?: (data: { error: boolean; errorMessage: string }) => void;
  onErrorEndDate?: (data: { error: boolean; errorMessage: string }) => void;
}

export default function DateRangeInputBusinessAnalytics({
  startDate = "",
  endDate = "",
  // isError = false,
  // errorMessage = "",
  numberOfResolution = 30,
  disableFuture = false,
  resolution = "day",
  onChangeStartDate = () => {},
  onChangeEndDate = () => {},
}: // onErrorStartDate = (data: { error: boolean; errorMessage: string }) => {},
// onErrorEndDate = (data: { error: boolean; errorMessage: string }) => {},
IDateRangeInputBusinessAnalyticsProps) {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);

  const handleChangeStartDateFromInput = (date: string) => {
    setStartDateValue(date);

    onChangeStartDate(date);
  };

  const handleChangeEndDateFromInput = (date: string) => {
    setEndDateValue(date);

    onChangeEndDate(date);
  };

  const isStartDateBiggerThanEndDate = moment(
    moment(startDateValue).format("YYYY-MM-DD")
  ).isAfter(moment(endDateValue).format("YYYY-MM-DD"), "day");

  const isStartDateLessThanDayResolution = moment(
    moment(startDateValue).format("YYYY-MM-DD")
  ).isBefore(
    moment(endDateValue)
      .subtract(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );

  const isStartDateAfterToday = moment(startDateValue).isAfter(
    moment().format("YYYY-MM-DD"),
    "day"
  );

  const isEndDateSmallerThanStartDate = moment(
    moment(endDateValue).format("YYYY-MM-DD")
  ).isBefore(moment(startDateValue).format("YYYY-MM-DD"), "day");

  const isEndDateMoreThanDayResolution = moment(
    moment(endDateValue).format("YYYY-MM-DD")
  ).isAfter(
    moment(startDateValue)
      .add(numberOfResolution, resolution as "day" | "week" | "month")
      .format("YYYY-MM-DD"),
    "day"
  );

  const isEndDateAfterToday = moment(endDateValue).isAfter(
    moment().format("YYYY-MM-DD"),
    "day"
  );

  const isErrorStartDate =
    isStartDateBiggerThanEndDate ||
    isStartDateLessThanDayResolution ||
    (disableFuture && isStartDateAfterToday);

  const isErrorEndDate =
    isEndDateSmallerThanStartDate ||
    isEndDateMoreThanDayResolution ||
    (disableFuture && isEndDateAfterToday);

  const startDateErrorMessage = isStartDateBiggerThanEndDate
    ? dictionaries.date_filter.error.start_date_must_be_smaller_than_end_date
    : isStartDateLessThanDayResolution
    ? dictionaries.date_filter.error.resolution
    : disableFuture && isStartDateAfterToday
    ? dictionaries.date_filter.error.future_selection
    : "";

  const endDateErrorMessage = isEndDateSmallerThanStartDate
    ? dictionaries.date_filter.error.end_date_must_be_greater_than_start_date
    : isEndDateMoreThanDayResolution
    ? dictionaries.date_filter.error.resolution
    : disableFuture && isEndDateAfterToday
    ? dictionaries.date_filter.error.future_selection
    : "";

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.25rem] w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-2 place-items-start place-content-start w-full gap-x-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
          )}
        >
          <p className={clsx("text-[0.75rem] font-bold text-white")}>
            {dictionaries.date_filter.start_date_input.label}
          </p>
          <DateInputBusinessAnalytics
            day={moment(startDate).format("DD")}
            month={moment(startDate).format("MM")}
            year={moment(startDate).format("YYYY")}
            isError={isErrorStartDate}
            errorMessage={startDateErrorMessage}
            onChangeDate={handleChangeStartDateFromInput}
          />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
          )}
        >
          <p className={clsx("text-[0.75rem] font-bold text-white")}>
            {dictionaries.date_filter.end_date_input.label}
          </p>
          <DateInputBusinessAnalytics
            day={moment(endDate).format("DD")}
            month={moment(endDate).format("MM")}
            year={moment(endDate).format("YYYY")}
            isError={isErrorEndDate}
            errorMessage={endDateErrorMessage}
            onChangeDate={handleChangeEndDateFromInput}
          />
        </div>
      </div>
    </div>
  );
}
