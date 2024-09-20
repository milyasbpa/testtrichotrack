import clsx from "clsx";
import { Autocomplete, AutocompleteProps } from "../autocomplete";
import moment from "moment";

export interface BirthdateDropdownProps {
  label?: string;
  date?: AutocompleteProps;
  month?: AutocompleteProps;
  year?: AutocompleteProps;
  value?: string;
  localTime?: boolean;
  onChange?: (data: string) => void;
}

// NOTES: date format "ISO string utc" in english
export const BirthdateDropdown = ({
  label = "",
  date,
  month,
  year,
  localTime = true,
  value = moment().toISOString(),
  onChange = () => {},
}: BirthdateDropdownProps) => {
  const existingDate = localTime
    ? moment(value).local().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    : value;
  const existingDateArr = existingDate.split("T")[0].split("-");
  const handleChangeDate = (data: { id: string; name: string }) => {
    const newValue = moment(existingDate)
      .set("date", parseInt(data.id))
      .toISOString();
    onChange(newValue);
  };

  const handleChangeMonth = (data: { id: string; name: string }) => {
    const newValue = moment(existingDate)
      .set("month", parseInt(data.id) - 1)
      .toISOString();
    if (moment(newValue).date() > moment(existingDate).daysInMonth()) {
      onChange(
        moment(existingDate)
          .set("date", moment(existingDate).daysInMonth())
          .toISOString()
      );
    } else {
      onChange(newValue);
    }
  };

  const handleChangeYear = (data: { id: string; name: string }) => {
    const newValue = moment(existingDate)
      .set("year", parseInt(data.id))
      .toISOString();
    onChange(newValue);
  };

  return (
    <div className={clsx("grid grid-cols-1 gap-x-[0.5rem]", "w-full")}>
      <p className={clsx("text-left font-bold text-white-87 text-[1rem]")}>
        {label}
      </p>

      <div className={clsx("grid grid-cols-3 gap-x-[1.5rem]", "w-full")}>
        <Autocomplete
          {...date}
          selected={
            date?.items?.find((item) => {
              return item.id === (existingDateArr[2] ?? "");
            }) ?? null
          }
          onSelect={(data: { id: string; name: string }) => {
            handleChangeDate(data);
            if (date?.onSelect) {
              date.onSelect(data);
            }
          }}
        />

        <Autocomplete
          {...month}
          selected={
            month?.items?.find((item) => {
              return item.id === (existingDateArr[1] ?? "");
            }) ?? null
          }
          onSelect={(data: { id: string; name: string }) => {
            handleChangeMonth(data);
            if (month?.onSelect) {
              month.onSelect(data);
            }
          }}
        />

        <Autocomplete
          {...year}
          selected={
            year?.items?.find((item) => {
              return item.id === (existingDateArr[0] ?? "");
            }) ?? null
          }
          onSelect={(data: { id: string; name: string }) => {
            handleChangeYear(data);
            if (date?.onSelect) {
              date.onSelect(data);
            }
          }}
        />
      </div>
    </div>
  );
};
