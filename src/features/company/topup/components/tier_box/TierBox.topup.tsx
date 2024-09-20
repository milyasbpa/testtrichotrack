import * as React from "react";
import clsx from "clsx";

export interface ITierBoxTopUpProps {
  type?: "credit" | "subscription" | null;
  active?: boolean;
  name?: string;
  duration?: string;
  price?: string;
  member?: {
    outlet: string;
    staff: string;
    customer: string;
  };
  intro?: string;
  terms?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      disabled: boolean;
      onClick: () => void;
    };
  };
  onClick?: () => void;
}

export const TierBoxTopUp = ({
  active = false,
  type = null,
  name = "",
  duration = "",
  price = "",
  member = {
    outlet: "",
    staff: "",
    customer: "",
  },
  intro = "",
  terms = "",
  cta = {
    primary: {
      children: "",
      disabled: false,
      onClick: () => {},
    },
  },
  onClick = () => {},
}: ITierBoxTopUpProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[1rem]",
        "w-[300px] h-full",
        "rounded-[1rem]",
        active && "border border-[#01AC67]",
        "px-[1rem] py-[1rem]",
        "bg-[rgba(255,255,255,0.08)]"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[#666666] text-[1.5rem] font-medium")}>
          {name}
        </p>

        {type === "subscription" && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <p className={clsx("text-white-87 text-[1.5rem] font-bold")}>
              {duration}
            </p>

            <p className={clsx("text-[#666666] text-[1rem] font-normal")}>
              {price}
            </p>
          </div>
        )}

        {type === "credit" && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <p className={clsx("text-white-87 text-[1.5rem] font-bold")}>
              {price}
            </p>
          </div>
        )}

        <div className={clsx("w-full h-[1px]", "bg-white-12")} />

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[#D8D8D8] text-[1rem] font-normal")}>
            {member.outlet}
          </p>
          <p className={clsx("text-[#D8D8D8] text-[1rem] font-normal")}>
            {member.staff}
          </p>
          <p className={clsx("text-[#D8D8D8] text-[1rem] font-normal")}>
            {member.customer}
          </p>

          <p className={clsx("text-[#666666] text-[1rem] font-normal")}>
            {intro}
          </p>
          <p className={clsx("text-[#666666] text-[1rem] font-normal")}>
            {terms}
          </p>
        </div>
      </div>

      <button
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "w-full",
          "rounded-[0.5rem]",
          "bg-[#017747]",
          "text-[white] text-[1rem] font-bold uppercase",
          "py-[0.75rem]",
          "disabled:opacity-20"
        )}
        disabled={cta.primary.disabled}
        onClick={cta.primary.onClick}
      >
        {cta.primary.children}
      </button>
    </div>
  );
};
