import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import SVGIcon from "src/core/ui/icons";
import { useIntersectionObserver, useDebounceCallback } from "usehooks-ts";

export interface AutocompleteProps {
  type?: "sync" | "async";
  label?: string;
  placeholder?: string;
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  error?: {
    message: string;
  };
  debounceQuery?: boolean;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  onLoadMore?: () => void;
}

export const Autocomplete = ({
  type = "sync",
  label = "",
  placeholder = "",
  selected = null,
  disabled = false,
  items = [],
  error = {
    message: "No Result",
  },

  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
  onQuery = () => {},
  onLoadMore = () => {},
}: AutocompleteProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const debounced = useDebounceCallback(onQuery, 500);

  const { ref, isIntersecting } = useIntersectionObserver();

  const filteredOutlets = !query.length
    ? items
    : type === "async"
    ? items
    : items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const handleChange = (data: { id: string; name: string }) => {
    onSelect(data);
  };

  useEffect(() => {
    if (isIntersecting && type === "async") {
      onLoadMore();
    }
  }, [isIntersecting, type]);

  return (
    <Combobox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className={clsx("relative w-full")}>
          {!!label.length && (
            <p className={clsx("text-white text-[1rem] font-bold")}>
              {label}
            </p>
          )}

          <div
            className={clsx(
              "mt-2",
              "relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-0 sm:text-sm bg-dark-charcoal"
            )}
          >
            <ComboboxInput
              className={clsx(
                "w-full",
                "p-[1rem]",
                "rounded-lg",
                disabled
                  ? "border border-[rgba(255,255,255,0.05)]"
                  : isFocus
                  ? "border-[1px] border-[#017948]"
                  : "border-[1px] border-dark-charcoal",
                disabled ? "bg-[#1F1F1F]" : "bg-[#262626]",
                "outline-none",
                "disabled:text-[#666666]",
                "placeholder:text-[#666666]",
                "text-[1rem] font-medium leading-5 text-white placeholder:text-white-60"
              )}
              displayValue={(data: { id: string; name: string }) =>
                data?.name ?? ""
              }
              placeholder={placeholder}
              disabled={disabled}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
              }}
            />
            {!disabled && (
              <ComboboxButton
                className={clsx(
                  open ? "rotate-180" : "rotate-0",
                  "absolute inset-y-0 right-[0.5rem] flex items-center justify-end"
                )}
              >
                <SVGIcon
                  name="Chevron"
                  className={clsx("w-[1.25rem] h-[1.25rem]", "fill-[#01ac67]")}
                />
              </ComboboxButton>
            )}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery("");
              onQuery("");
            }}
          >
            <ComboboxOptions
              className={clsx(
                "absolute w-full rounded-md bg-dark-charcoal z-9999",
                "max-h-[160px]",
                "overflow-auto",
                "mt-[0.5rem]",
                "z-[10]",
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
                  {error.message}
                </div>
              ) : (
                filteredOutlets.map((outlet, index) => (
                  <ComboboxOption
                    key={index}
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

              {/* NOTES: infinite scroll identifier */}
              <div
                ref={ref}
                className={clsx("opacity-0", "h-[0px]", "overflow-hidden")}
              >
                Bottom
              </div>
            </ComboboxOptions>
          </Transition>
        </div>
      )}
    </Combobox>
  );
};
