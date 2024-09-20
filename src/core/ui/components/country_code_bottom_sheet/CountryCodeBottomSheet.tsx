import clsx from "clsx";
import { BottomSheet } from "../bottom_sheet";
import { Textfield } from "../textfield";
import { SearchNotFoundIcon } from "../../icons/search_not_found";
import SVGIcon from "../../icons";
import { useEffect, useState } from "react";

export interface CountryCodeBottomSheetItemsProps {
  id: string;
  name: string;
  image_url: string;
}

export interface CountryCodeBottomSheetProps {
  title?: string;
  open?: boolean;
  search?: {
    errorMessage: string;
    placeholder: string;
  };
  items?: CountryCodeBottomSheetItemsProps[];
  onClose?: () => void;
  onSelect?: (data: CountryCodeBottomSheetItemsProps) => void;
}

export const CountryCodeBottomSheet = ({
  title = "",
  open = false,
  search = {
    placeholder: "",
    errorMessage: "",
  },
  items = [],
  onClose = () => {},
  onSelect = () => {},
}: CountryCodeBottomSheetProps) => {
  const [query, setQuery] = useState<string>("");

  const availableItems = !query.length
    ? items
    : items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open]);
  return (
    <BottomSheet
      open={open}
      onClose={() => {
        onClose();
        setQuery("");
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[2rem] font-bold text-white-87 text-left")}>
          {title}
        </p>

        <Textfield
          startAddornment={
            <SVGIcon
              name="Search"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-[#999999]")}
            />
          }
          placeholder={search.placeholder}
          value={query}
          onChange={handleChangeSearch}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-start justify-items-start",
          "w-full h-[408px]",
          "overflow-auto"
        )}
      >
        {!!availableItems.length &&
          availableItems.map((item, index) => (
            <div
              id={item.id}
              key={index}
              className={clsx(
                "grid grid-flow-col gap-x-[1rem] items-center content-center justify-between justify-items-start",
                "w-full",
                index !== availableItems.length - 1 &&
                  "border-b border-b-white-12",
                "px-[1.5rem] py-[1.5rem]",
                "box-border"
              )}
              onClick={() => onSelect(item)}
            >
              <div
                className={clsx(
                  "grid grid-flow-col gap-x-[1rem] items-center content-center justify-start justify-items-start"
                )}
              >
                <img src={item.image_url} />
                <p
                  className={clsx(
                    "text-[1rem] text-left text-white font-regular"
                  )}
                >
                  {item.name}
                </p>
              </div>

              <p
                className={clsx(
                  "text-[1rem] text-left text-white-60 font-semibold"
                )}
              >
                {item.id}
              </p>
            </div>
          ))}

        {!availableItems.length && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
              "w-full"
            )}
          >
            <SearchNotFoundIcon
              className={clsx("w-[150px] h-[150px]", "fill-[#9A2C14]")}
            />

            <p
              className={clsx(
                "text-[1.25rem] text-left text-white-60 font-regular"
              )}
            >
              {search.errorMessage}
            </p>
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
