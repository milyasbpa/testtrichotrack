import { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import SVGIcon from "src/core/ui/icons";

export interface AgeAutocompleteInactiveProps {
  label?: string;
  selected?: { id: number; name: string };
  data?: { id: number; name: string }[];
  onChange?: (data: { id: number; name: string }) => void;
}

AgeAutocompleteInactive.defaultProps = {
  label: "",
  defaultSelected: {
    id: -1,
    name: "All Outlets",
  },
  data: [],
};

export default function AgeAutocompleteInactive(
  props: AgeAutocompleteInactiveProps
) {
  const [selected, setSelected] = useState(props.selected);
  const [query, setQuery] = useState("");

  const filteredOutlets =
    query === "" && props.data !== undefined
      ? props.data
      : query !== "" && props.data !== undefined && props.data.length > 0
      ? props.data.filter((data) =>
          data.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
      : [];

  const handleChange = (data: { id: number; name: string }) => {
    setSelected(data);
    if (props.onChange) {
      props.onChange(data);
    }
  };

  useEffect(() => {
    if (props.selected) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  return (
    <Combobox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className={clsx("relative w-full")}>
          <p className={clsx("text-white text-[0.75rem] font-bold")}>
            {props.label}
          </p>
          <div
            className={clsx(
              "mt-2",
              "relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-0 sm:text-sm bg-dark-charcoal"
            )}
          >
            <ComboboxInput
              className={clsx(
                "w-full border-none p-[1rem]",
                "bg-dark-charcoal",
                "outline-none",
                "text-[1rem] font-medium leading-5 text-white placeholder:text-white-60"
              )}
              displayValue={(outlet: { id: number; name: string }) =>
                outlet.name
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton
              className={clsx(
                open ? "rotate-180" : "rotate-0",
                "absolute inset-y-0 right-[0.5rem] flex items-center justify-end"
              )}
            >
              <SVGIcon
                name="Chevron"
                className={clsx("w-[1.25rem] h-[1.25rem]", "fill-go-green")}
              />
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions
              className={clsx(
                "absolute max-h-60 w-full overflow-auto rounded-md bg-dark-charcoal z-9999",
                "mt-[0.5rem]",
                "text-base focus:outline-none sm:text-sm"
              )}
            >
              {filteredOutlets.length === 0 && query !== "" ? (
                <div
                  className={clsx(
                    "relative cursor-default select-none",
                    "p-[1rem]",
                    "text-[1rem] text-white font-normal"
                  )}
                >
                  {"No Result"}
                </div>
              ) : (
                filteredOutlets.map((outlet, index) => (
                  <ComboboxOption
                    key={outlet.id}
                    className={() =>
                      clsx(
                        `relative cursor-pointer select-none p-[1rem]`,
                        "bg-dark-charcoal",
                        filteredOutlets.length - 1 !== index
                          ? "border-b border-b-white-12"
                          : "border-b border-b-dark-charcoal"
                      )
                    }
                    value={outlet}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            "text-[1rem]",
                            selected
                              ? "font-bold text-philippine-green"
                              : "font-normal text-white"
                          )}
                        >
                          {outlet.name}
                        </span>
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
