import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export const SkeletonSortPaymentHistory = () => {
  const arrayGenerator = Array.from({ length: 2 }, (_, i) => i);
  return (
    <div className={clsx("grid grid-cols-2", "gap-[1.5rem]", "w-full")}>
      {arrayGenerator.map((item) => (
        <Skeleton key={item} width={"100%"} height={52} />
      ))}
    </div>
  );
};
