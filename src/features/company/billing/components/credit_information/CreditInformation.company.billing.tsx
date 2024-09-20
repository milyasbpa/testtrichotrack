import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";
import SVGIcon from "src/core/ui/icons";

export interface CreditInformationCompanyBillingProps {
  title?: string;
  description?: string;
  loading?: boolean;
}

export const CreditInformationCompanyBilling = ({
  title = "",
  description = "",
  loading = false,
}: CreditInformationCompanyBillingProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-end justify-items-end"
      )}
    >
      <p
        className={clsx(
          "text-[1rem] text-[rgba(255,255,255,0.3)] font-semibold"
        )}
      >
        {title}
      </p>
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[0.5rem]"
        )}
      >
        <SVGIcon
          name="MonetizationOn"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
        />
        {loading ? (
          <Skeleton width={200} height={16} />
        ) : (
          <p
            className={clsx(
              "text-[1.25rem] text-[rgba(255,255,255)] font-semibold"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
