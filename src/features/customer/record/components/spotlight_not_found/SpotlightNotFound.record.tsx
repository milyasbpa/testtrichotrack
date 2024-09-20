import clsx from "clsx";
import { SearchNotFoundIcon } from "src/core/ui/icons/search_not_found";

export interface SpotlightNotFoundRecordProps {
  message?: string;
  description?: string;
}

export const SpotlightNotFoundRecord = ({
  message = "",
  description = "",
}: SpotlightNotFoundRecordProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-y-[166px]",
        "w-full",
        "pt-[88px]",
        "box-border"
      )}
    >
      <h3 className={clsx("text-center text-[2rem] text-white-87 font-bold")}>
        {message}
      </h3>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[166px] items-start content-start justify-center justify-items-center",
          "w-full",
          "box-border"
        )}
      >
        <SearchNotFoundIcon
          className={clsx("w-[150px] h-[150px]", "fill-[#9A2C14]")}
        />
        <p
          className={clsx(
            "text-center text-[1.25rem] text-white-60 font-regular"
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
