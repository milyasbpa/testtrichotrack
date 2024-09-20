import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export const ListLoaderPaymentHistory = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr_auto] items-center content-center gap-[0.5rem]",
        "bg-[#2f2f2f]",
        "rounded-[0.5rem]",
        "box-border",
        "max-h-[112px]",
        "px-[1rem] py-[1rem]"
      )}
    >
      <Skeleton width={80} height={80} circle />
      <div className={clsx("grid grid-cols-1 gap-[0.5rem]", "w-full")}>
        <Skeleton width={"100%"} height={28} />
        <Skeleton width={"100%"} height={20} />
      </div>

      <Skeleton width={24} height={24} circle />
    </div>
  );
};
