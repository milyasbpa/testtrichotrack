import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";

export interface SubscriptionInformationCompanyBillingProps {
  title?: string;
  description?: string;
  sub_description?: string;
  loading?: boolean;
}

export const SubscriptionInformationCompanyBilling = ({
  title = "",
  description = "",
  sub_description = "",
  loading = false,
}: SubscriptionInformationCompanyBillingProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-end justify-items-end gap-[0.5rem]"
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
        <Skeleton width={200} height={16} />
      ) : (
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[0.5rem]"
          )}
        >
          <p
            className={clsx(
              "text-[1.25rem] text-[rgba(255,255,255,0.3)] font-semibold"
            )}
          >
            {description}
          </p>
          <p
            className={clsx(
              "text-[1.5rem] text-[rgba(255,255,255,0.3)] font-semibold"
            )}
          >
            {"-"}
          </p>
          <p
            className={clsx(
              "text-[1.25rem] text-[rgba(255,255,255)] font-semibold"
            )}
          >
            {sub_description}
          </p>
        </div>
      )}
    </div>
  );
};
