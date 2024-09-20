import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export interface TierInformationCompanyBillingProps {
  title?: string;
  description?: string;
  loading?: boolean;
}

export const TierInformationCompanyBilling = ({
  title = "",
  description = "",
  loading = false,
}: TierInformationCompanyBillingProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]"
      )}
    >
      <p
        className={clsx(
          "text-[1rem] text-[rgba(255,255,255,0.3)] font-semibold"
        )}
      >
        {title}
      </p>
      {loading ? (
        <div className={clsx("w-full")}>
          <Skeleton width="100%" height={16} />
        </div>
      ) : (
        <p className={clsx("text-[1.25rem] text-[white] font-regular")}>
          {description}
        </p>
      )}
    </div>
  );
};
