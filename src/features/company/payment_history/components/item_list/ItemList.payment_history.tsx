import * as React from "react";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";

export interface IItemListPaymentHistoryProps {
  id?: null | number;
  picture?: string;
  timestamp?: string;
  name?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
      onClick: () => void;
    };
  };
}

export const ItemListPaymentHistory = ({
  id = null,
  timestamp = "",
  picture = "",
  name = "",
  cta = {
    primary: {
      children: "",
      href: "",
      onClick: () => {},
    },
  },
}: IItemListPaymentHistoryProps) => {
  return (
    <button
      key={id}
      className={clsx(
        "grid grid-cols-[auto_1fr_auto] items-center content-center gap-x-[1rem]",
        "p-[1rem]",
        "cursor-pointer",
        "bg-dark-charcoal",
        "rounded-[0.5rem]"
      )}
    >
      {!picture.length ? (
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[56px] h-[56px]",
            "rounded-[50%]",
            "bg-[#B9FFE2]"
          )}
        >
          <SVGIcon
            name="Receipt"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[#017948]")}
          />
        </div>
      ) : (
        <img
          src={picture}
          className={clsx("w-[56px] h-[56px]", "rounded-[50%]")}
        />
      )}

      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] justify-start justify-items-start items-center content-center"
        )}
      >
        <p className={clsx("text-[1rem] text-white font-regular text-center")}>
          {timestamp}
        </p>
        <p className={clsx("text-[1.5rem] text-white font-bold text-center")}>
          {name}
        </p>
      </div>

      {!!cta.primary.href.length && (
        <button
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "px-[1rem] py-[1rem]",
            "border border-[#017948]",
            "rounded-[0.75rem]",
            "text-[#017948] text-[1.25rem] font-bold uppercase"
          )}
          onClick={cta.primary.onClick}
        >
          <SVGIcon
            name="CloudDownload"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[#017948]")}
          />
          {cta.primary.children}
        </button>
      )}
    </button>
  );
};
