import clsx from "clsx";
import { Autocomplete } from "src/core/ui/components/autocomplete";

export interface AgeRangeAutocompleteCustomerInsightProps {
  minAge?: {
    label: string;
    selected: {
      id: string;
      name: string;
    } | null;
    items: { id: string; name: string }[];
  };
  maxAge?: {
    label: string;
    selected: {
      id: string;
      name: string;
    } | null;
    items: {
      id: string;
      name: string;
    }[];
  };
  onSelectAge?: (data: {
    minAge: {
      id: string;
      name: string;
    } | null;
    maxAge: {
      id: string;
      name: string;
    } | null;
  }) => void;
}

export const AgeRangeAutocompleteCustomerInsight = ({
  minAge = {
    label: "",
    selected: null,
    items: [],
  },
  maxAge = {
    label: "",
    selected: null,
    items: [],
  },
  onSelectAge = () => {},
}: AgeRangeAutocompleteCustomerInsightProps) => {
  const handleSelectMinAge = (data: { id: string; name: string }) => {
    const isError = parseInt(data.id) > parseInt(maxAge.selected?.id ?? "40");
    if (!isError) {
      onSelectAge({
        minAge: data,
        maxAge: maxAge.selected,
      });
    }
  };
  const handleSelectMaxAge = (data: { id: string; name: string }) => {
    const isError = parseInt(data.id) < parseInt(minAge.selected?.id ?? "30");
    if (!isError) {
      onSelectAge({
        minAge: minAge.selected,
        maxAge: data,
      });
    }
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-2 col-span-2 w-full place-content-start place-items-start gap-x-[1rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.25rem]"
        )}
      >
        <Autocomplete
          label={minAge.label}
          items={minAge.items}
          selected={minAge.selected}
          onSelect={handleSelectMinAge}
        />
        <p
          className={clsx(
            "text-[0.75rem] text-flame font-normal",
            parseInt(minAge.selected?.id ?? "30") >
              parseInt(maxAge.selected?.id ?? "40")
              ? "block"
              : "hidden"
          )}
        >
          {/* {min_age_filter.errors.greater_than_max_age} */}
        </p>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.25rem]"
        )}
      >
        <Autocomplete
          label={maxAge.label}
          items={maxAge.items}
          selected={maxAge.selected}
          onSelect={handleSelectMaxAge}
        />
        <p
          className={clsx(
            "text-[0.75rem] text-flame font-normal",
            parseInt(maxAge.selected?.id ?? "30") <
              parseInt(minAge.selected?.id ?? "40")
              ? "block"
              : "hidden"
          )}
        >
          {/* {max_age_filter.errors.less_than_min_age} */}
        </p>
      </div>
    </div>
  );
};
