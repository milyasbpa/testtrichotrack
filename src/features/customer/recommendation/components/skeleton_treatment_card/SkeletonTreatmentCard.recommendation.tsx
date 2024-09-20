import clsx from "clsx";

export const SkeletonTreatmentCardRecommendation = () => {
  return (
    <button
      className={clsx(
        "bg-dark-charcoal",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
        "w-full",
        "rounded-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "rounded-[0.5rem]",
          "w-full h-[232px]",
          "animate-pulse",
          "bg-black-olive"
        )}
      />

      <div
        className={clsx(
          "rounded-[0.5rem]",
          "w-[100px] h-[20px]",
          "animate-pulse",
          "bg-black-olive"
        )}
      />

      <div
        className={clsx(
          "rounded-[0.5rem]",
          "w-full h-[20px]",
          "animate-pulse",
          "bg-black-olive"
        )}
      />
      <div
        className={clsx(
          "rounded-[0.5rem]",
          "w-full h-[20px]",
          "animate-pulse",
          "bg-black-olive"
        )}
      />
    </button>
  );
};
