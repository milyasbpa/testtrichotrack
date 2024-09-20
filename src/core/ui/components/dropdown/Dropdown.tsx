import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import SVGIcon from "../../icons";

export interface DropdownProps {
  label?: string;
  selected?: { id: string; name: string } | null;
  placeholder?: string;
  items?: { id: string; name: string }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const Dropdown = ({
  label = "",
  selected = null,
  placeholder = "",
  items = [],
  onSelect = () => {},
}: DropdownProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {!!label.length && (
        <p className={clsx("text-white text-[1rem] font-bold")}>{label}</p>
      )}
      <Listbox value={selected} onChange={onSelect}>
        <ListboxButton
          className={clsx(
            "relative w-full cursor-default rounded-lg text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
            "bg-dark-charcoal",
            "p-[1rem]"
          )}
        >
          <span
            className={clsx("text-[1rem] font-medium leading-5 text-white")}
          >
            {selected?.name ?? placeholder}
          </span>
          <span
            className={clsx(
              "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            )}
          >
            <SVGIcon
              name="Chevron"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-go-green")}
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)]",
            "overflow-auto",
            "rounded-md",
            "bg-dark-charcoal",
            "py-1",
            "max-h-[100px]",
            "mt-1",
            "z-[10]",
            "shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          {items.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className={clsx(
                `relative cursor-default select-none`,
                "text-[1rem]",
                selected?.id === item.id
                  ? "font-bold text-philippine-green"
                  : "font-normal text-[white]",
                "p-[1rem]",
                "overflow-auto",
                "data-focus"
              )}
            >
              {item.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
