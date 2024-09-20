import clsx from "clsx";

import { SearchNotFoundIcon } from "src/core/ui/icons/search_not_found";

export interface NoTrendResultScanProps {
  message?: string;
  description?: string;
}

export const NoTrendResultScan = ({
  message = "",
  description = "",
}: NoTrendResultScanProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[54px]",
        "w-full"
      )}
    >
      <p className={clsx("text-[2rem] text-white-80 font-bold")}>{message}</p>

      <SearchNotFoundIcon
        className={clsx("w-[150px] h-[150px]", "fill-[#9A2C14]")}
      />
      <p className={clsx("text-[1.25rem] text-white-60 font-regular")}>
        {description}
      </p>
    </div>
  );
};
