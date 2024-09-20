import clsx from "clsx";
import { Skeleton } from "src/core/ui/components/skeleton";
import SVGIcon from "src/core/ui/icons";

export interface MemberListCompanyBillingProps {
  label?: string;
  number?: string;
  limit?: string;
  icon?: string;
  loading?: boolean;
}

export const MemberListCompanyBilling = ({
  label = "",
  number = "-",
  limit = "-",
  icon = "",
  loading = false,
}: MemberListCompanyBillingProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "px-[0.5rem] py-[0.5rem]",
          "bg-[#252525]",
          "rounded-[0.5rem]"
        )}
      >
        <SVGIcon
          name={icon as any}
          className={clsx("w-[2.5rem] h-[2.5rem]", "fill-[white]")}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[1rem] text-[rgba(255,255,255,0.3)] font-semibold"
          )}
        >
          {label}
        </p>
        {loading ? (
          <div className={clsx("w-full")}>
            <Skeleton width={"100%"} height={32} />
          </div>
        ) : (
          <p className={clsx("text-[1.5rem] text-[white] font-regular")}>
            {`${number}/${limit}`}
          </p>
        )}
      </div>
    </div>
  );
};
