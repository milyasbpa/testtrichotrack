import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export const SkeletonScanCardRecord = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        "rounded-[1rem]",
        "min-w-[308px]",
        "w-full",
        "box-border"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] content-center items-center justify-start justify-items-start gap-x-[1rem]",
          "p-[1rem]",
          "w-full h-[4rem]",
          "rounded-tl-[1rem] rounded-tr-[1rem]",
          "box-border",
          "bg-charleston-green"
        )}
      >
        <Skeleton width={32} height={32} circle />
        <Skeleton width={"100%"} height={22} />
        <Skeleton width={22} height={22} />
      </div>
      <Skeleton width={"100%"} height={368} />
    </div>
  );
};
