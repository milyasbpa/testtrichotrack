import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import {
  RatingBarChartCustomerInactive,
  RatingBarChartCustomerInactiveProps,
} from "../rating_bar_chart/RatingBarChart.inactive";

export interface IRatingCardInactiveProps
  extends RatingBarChartCustomerInactiveProps {
  name?: string;
}

export const RatingCardInactive = ({
  name,
  data = [],
  labels = [],
}: IRatingCardInactiveProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (ref.current !== null) {
      setCardWidth(ref.current.offsetWidth);
    }
  }, [ref.current?.offsetWidth]);

  const barChartWidth =
    50 * data.length <= cardWidth ? cardWidth : 50 * data.length;

  return (
    <div
      ref={ref}
      className={clsx(
        "bg-raisin-black",
        "rounded-[0.5rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
      )}
    >
      <div className={clsx("p-[1rem]")}>
        <h3 className={clsx("text-[1.25rem] font-bold text-white")}>{name}</h3>
      </div>

      <div className={clsx("w-full h-[1px]", "bg-granite-gray")} />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full",
          "overflow-x-auto"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "p-[1rem]"
          )}
          style={{
            width: barChartWidth,
            minWidth: "100%",
          }}
        >
          <RatingBarChartCustomerInactive data={data} labels={labels} />
        </div>
      </div>
    </div>
  );
};
