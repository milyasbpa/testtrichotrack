import clsx from "clsx";

export default function SkeletonCategoryDescriptionCardDiagnosis() {
  return (
    <div
      className={clsx(
        "flex items-start justify-between flex-col gap-x-[1rem]",
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "px-[1rem] py-[1rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
          "w-[316px] h-[342px]"
        )}
      >
        <div
          className={clsx(
            "rounded-[0.5rem]",
            "w-[100px] h-[24px]",
            "animate-pulse",
            "bg-black-olive"
          )}
        />

        <div
          className={clsx(
            "rounded-[0.5rem]",
            "w-full h-[16px]",
            "animate-pulse",
            "bg-black-olive"
          )}
        />
        <div
          className={clsx(
            "rounded-[0.5rem]",
            "w-[250px] h-[16px]",
            "animate-pulse",
            "bg-black-olive"
          )}
        />
        <div
          className={clsx(
            "rounded-[0.5rem]",
            "w-[200px] h-[16px]",
            "animate-pulse",
            "bg-black-olive"
          )}
        />
      </div>

      <div
        className={clsx(
          "rounded-[0.5rem]",
          "w-full h-[36px]",
          "animate-pulse",
          "bg-black-olive"
        )}
      />
    </div>
  );
}
