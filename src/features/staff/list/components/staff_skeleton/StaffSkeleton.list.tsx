import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export const SkeletonStaffList = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-center justify-items-center gap-y-[1.5rem] w-full",
        "p-[1rem]",
        "cursor-pointer",
        "bg-dark-charcoal",
        "rounded-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] justify-center justify-items-center items-start content-start w-full"
        )}
      >
        <Skeleton width={80} height={80} circle />

        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] justify-center justify-items-center items-start content-start w-full"
          )}
        >
          <Skeleton width={"100%"} height={28} />
          <Skeleton width={"100%"} height={20} />
          <Skeleton width={"100%"} height={16} />
          <Skeleton width={"100%"} height={16} />
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-2 gap-x-[1rem] place-content-start place-items-start w-full"
        )}
      >
        <Skeleton width={"100%"} height={44} />
        <Skeleton width={"100%"} height={44} />
      </div>
    </div>
  );
};
