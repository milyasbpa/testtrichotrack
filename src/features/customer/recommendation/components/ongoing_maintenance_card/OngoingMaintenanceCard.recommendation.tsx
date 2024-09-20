import clsx from "clsx";

export interface OngoingMaintenanceCardRecommendationProps {
  message?: string;
}

export const OngoingMaintenanceCardRecommendation = ({
  message = "",
}: OngoingMaintenanceCardRecommendationProps) => {
  return (
    <div
      className={clsx(
        "bg-dark-charcoal",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
        "w-full",
        "rounded-[0.5rem]",
        "text-[1rem] text-white-80 font-bold"
      )}
    >
      {message}
    </div>
  );
};
