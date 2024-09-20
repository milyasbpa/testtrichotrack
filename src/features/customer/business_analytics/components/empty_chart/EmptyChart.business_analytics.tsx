import clsx from "clsx";

export interface IEmptyChartBusinessAnalyticsProps {
  message?: string;
  description?: string;
  title?: string;
}

EmptyChartBusinessAnalytics.defaultProps = {
  message: "",
  description: "",
  title: "",
};

export default function EmptyChartBusinessAnalytics(
  props: IEmptyChartBusinessAnalyticsProps
) {
  return (
    <div
      className={clsx(
        "bg-raisin-black",
        "rounded-[0.5rem]",
        "grid grid-cols-1 place-content-start place-items-start w-full"
      )}
    >
      <div className={clsx("p-[1rem]")}>
        <h3 className={clsx("text-[1.25rem] font-bold text-white")}>
          {props.title}
        </h3>
      </div>

      <div className={clsx("w-full h-[1px]", "bg-granite-gray")} />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center w-full gap-y-[1rem]",
          "px-[1rem] py-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center w-full gap-y-[1rem]",
            "border border-granite-gray",
            "py-[54px]",
            "rounded-[0.5rem]"
          )}
        >
          <img
            src={"/illustrations/chart-is-empty.illustration.svg"}
            width={142}
            height={142}
          />
          <p className={clsx("text-[1.125rem] font-bold text-white")}>
            {props.message}
          </p>
          <p className={clsx("text-[1rem] font-normal text-white-57")}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
