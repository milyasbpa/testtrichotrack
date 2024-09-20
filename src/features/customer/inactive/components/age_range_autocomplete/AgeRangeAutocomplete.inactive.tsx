import { useMemo } from "react";
import clsx from "clsx";
import { Autocomplete } from "src/core/ui/components/autocomplete";

export interface AgeRangeAutocompleteInsightProps {
  minAge?: {
    label: string;
    selected: {
      id: string;
      name: string;
    } | null;
  };
  maxAge?: {
    label: string;
    selected: {
      id: string;
      name: string;
    } | null;
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

export const AgeRangeAutocompleteCustomerInactive = ({
  minAge = {
    label: "",
    selected: {
      id: "30",
      name: "30",
    },
  },
  maxAge = {
    label: "",
    selected: {
      id: "40",
      name: "40",
    },
  },
  onSelectAge = () => {},
}: AgeRangeAutocompleteInsightProps) => {
  const age = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return {
        id: String(i + 1),
        name: String(i + 1),
      };
    });
  }, []);

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
          // label={min_age_filter.label}
          label={minAge.label}
          items={age}
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
          // label={max_age_filter.label}
          label={maxAge.label}
          items={age}
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
