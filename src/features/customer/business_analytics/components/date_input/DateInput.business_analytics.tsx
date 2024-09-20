import { useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export interface IDateInputBusinessAnalyticsProps {
  day?: string;
  month?: string;
  year?: string;
  isError?: boolean;
  errorMessage?: string;
  onChangeDate?: (date: string) => void;
  onError?: (data: { error: boolean; errorMessage: string }) => void;
}

export const DateInputBusinessAnalytics = ({
  day = "30",
  month = "03",
  year = "2023",
  isError = false,
  errorMessage = "",
  onChangeDate = () => {},
  onError = () => {},
}: IDateInputBusinessAnalyticsProps) => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const [dayValue, setDayValue] = useState(day);
  const [monthValue, setMonthValue] = useState(month);
  const [yearValue, setYearValue] = useState(year);

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = `${e.currentTarget.value}-${monthValue}-${dayValue}`;
    setYearValue(e.currentTarget.value);
    if (onChangeDate) {
      onChangeDate(newValue);
    }
  };

  const handleChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = `${yearValue}-${e.currentTarget.value}-${dayValue}`;
    setMonthValue(e.currentTarget.value);
    if (onChangeDate) {
      onChangeDate(newValue);
    }
  };

  const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = `${yearValue}-${monthValue}-${e.currentTarget.value}`;
    setDayValue(e.currentTarget.value);
    if (onChangeDate) {
      onChangeDate(newValue);
    }
  };

  const newDate = `${yearValue}-${monthValue}-${dayValue}`;
  const isDayLengthFit = String(dayValue).length === 2;
  const isMonthLengthFit = String(monthValue).length === 2;
  const isYearLengthFit = String(yearValue).length === 4;
  const isDateValid = moment(newDate).isValid();

  const isInputError =
    !isDateValid ||
    !isDayLengthFit ||
    !isMonthLengthFit ||
    !isYearLengthFit ||
    isError;

  const errorMessageValue = !isDateValid
    ? dictionaries.date_filter.error.invalid_date
    : !isDayLengthFit
    ? dictionaries.date_filter.error.invalid_date
    : !isMonthLengthFit
    ? dictionaries.date_filter.error.invalid_date
    : !isYearLengthFit
    ? dictionaries.date_filter.error.invalid_date
    : isError
    ? String(errorMessage)
    : "";

  useEffect(() => {
    if (!!month && !!day && !!year) {
      setDayValue(day);
      setMonthValue(month);
      setYearValue(year);
    }
  }, [day, month, year]);

  useEffect(() => {
    if (isInputError && errorMessageValue.length > 0 && onError) {
      onError({
        error: isInputError,
        errorMessage: errorMessageValue,
      });
    }
  }, [isInputError, errorMessage]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[0.25rem] place-content-start place-items-start w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.25rem] place-content-start place-items-start w-full",
          "bg-raisin-black",
          "rounded-[0.5rem]",
          "px-[1rem] py-[1rem]",
          "border",
          isInputError ? "border-flame" : "border-raisin-black"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col gap-x-[0.5rem] w-full justify-start justify-items-start items-center content-center"
          )}
        >
          <input
            className={clsx(
              "w-[2.25rem]",
              "outline-none",
              "p-0",
              "bg-raisin-black",
              "text-[1rem] text-lotion font-normal",
              "placeholder:text-[1rem] placeholder:text-granite-gray placeholder:font-normal"
            )}
            placeholder={"YYYY"}
            value={yearValue}
            maxLength={4}
            onChange={handleChangeYear}
          />
          <p className={clsx("text-[1rem] text-lotion font-normal")}>{"/"}</p>
          <input
            className={clsx(
              "w-[1.25rem]",
              "outline-none",
              "p-0",
              "bg-raisin-black",
              "text-[1rem] text-lotion font-normal",
              "placeholder:text-[1rem] placeholder:text-granite-gray placeholder:font-normal"
            )}
            placeholder={"MM"}
            value={monthValue}
            maxLength={2}
            onChange={handleChangeMonth}
          />
          <p className={clsx("text-[1rem] text-lotion font-normal")}>{"/"}</p>
          <input
            className={clsx(
              "w-[1.25rem]",
              "outline-none",
              "p-0",
              "bg-raisin-black",
              "text-[1rem] text-lotion font-normal",
              "placeholder:text-[1rem] placeholder:text-granite-gray placeholder:font-normal"
            )}
            placeholder={"DD"}
            value={dayValue}
            maxLength={2}
            onChange={handleChangeDay}
          />
        </div>
      </div>
      <p
        className={clsx(
          "text-[0.75rem] text-flame font-normal",
          isError ? "block" : "hidden"
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};
