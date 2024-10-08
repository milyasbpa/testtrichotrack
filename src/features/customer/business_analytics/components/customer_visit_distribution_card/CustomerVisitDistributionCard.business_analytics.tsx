import { useRef, useState, useLayoutEffect } from "react";
import clsx from "clsx";
import {
  CustomerVisitDistributionBarChartBusinessAnalytics,
  CustomerVisitDistributionBarChartBusinessAnalyticsProps,
} from "../customer_visit_distribution_bar_chart/CustomerVisitDistributionBarChart.business_analytics";

export interface ICustomerVisitDistributionCardBusinessAnalyticsProps
  extends CustomerVisitDistributionBarChartBusinessAnalyticsProps {
  title?: string;
}

export const CustomerVisitDistributionCardBusinessAnalytics = ({
  title = "",
  data = [],
  labels = [],
}: ICustomerVisitDistributionCardBusinessAnalyticsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current !== null) {
      setCardWidth(ref.current.offsetWidth);
    }
  }, []);

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
        <h3 className={clsx("text-[1.25rem] font-bold text-white")}>{title}</h3>
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
          style={{ width: barChartWidth, minWidth: "100%" }}
        >
          <CustomerVisitDistributionBarChartBusinessAnalytics
            data={data}
            labels={labels}
          />
        </div>
      </div>
    </div>
  );
};
