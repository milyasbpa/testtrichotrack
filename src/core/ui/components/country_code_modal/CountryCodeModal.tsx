import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { DialogTitle } from "@headlessui/react";
import { Modal } from "../modal";
import SVGIcon from "../../icons";
import { Textfield } from "../textfield";
import { SearchNotFoundIcon } from "../../icons/search_not_found";

export interface CountryCodeModalItemsProps {
  id: string;
  name: string;
  image_url: string;
}

export interface CountryCodeModalProps {
  title?: string;
  open?: boolean;
  search?: {
    errorMessage: string;
    placeholder: string;
  };

  items?: CountryCodeModalItemsProps[];
  onClose?: () => void;
  onSelect?: (data: CountryCodeModalItemsProps) => void;
}

export const CountryCodeModal = ({
  title = "",
  search = {
    placeholder: "",
    errorMessage: "",
  },
  open = false,
  items = [],
  onClose = () => {},
  onSelect = () => {},
}: CountryCodeModalProps) => {
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
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setQuery("");
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center gap-y-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1.5rem]"
        )}
      >
        <div className={clsx("flex items-center justify-between w-full")}>
          <div />
          <DialogTitle
            as="h3"
            className={clsx("text-[2rem] font-bold text-white-87 text-left")}
          >
            {title}
          </DialogTitle>

          <button
            onClick={() => {
              onClose();
              setQuery("");
            }}
          >
            <SVGIcon
              name="Close"
              className={clsx("w-[2rem] h-[2rem]", "fill-white")}
            />
          </button>
        </div>

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

        <div
          className={clsx(
            "grid grid-cols-1 justify-start justify-items-start",
            "w-full h-[320px]",
            "overflow-auto"
          )}
        >
          {!!availableItems.length &&
            availableItems.map((item, index) => (
              <div
                id={item.id}
                key={index}
                className={clsx(
                  "flex justify-between justify-items-start",
                  "w-full",
                  "border-b border-b-white-12",
                  "p-[1.5rem]",
                  "box-border"
                )}
                onClick={() => onSelect(item)}
              >
                <div
                  className={clsx(
                    "grid grid-flow-col gap-x-[1rem] justify-start justify-items-start"
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
                "w-full h-full"
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
      </div>
    </Modal>
  );
};
