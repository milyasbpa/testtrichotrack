import { useContext, useLayoutEffect, useRef, useState } from "react";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { useCustomerInactiveGetAgeStatistics } from "../../react_query/hooks/useGetAgeStatistics.inactive";
import { AgeDistributionBarChartInactive } from "../../components/age_distribution_bar_chart/AgeDistributionBarChart.inactive";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const AgeDistributionCustomerInactive = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerInactiveContext);
  const { isFetching: isFetchingGetAgeStatistics } =
    useCustomerInactiveGetAgeStatistics();

  const ref = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current !== null) {
      setCardWidth(ref.current.offsetWidth);
    }
  }, []);

  const barChartWidth =
    50 * state.age.available_slot <= cardWidth
      ? cardWidth
      : 50 * state.age.available_slot;
  if (isFetchingGetAgeStatistics) {
    return null;
  }

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
        <h3 className={clsx("text-[1.25rem] font-bold text-white")}>
          {dictionaries.age_distribution_card.title}
        </h3>
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
          <AgeDistributionBarChartInactive
            data={state.age.data}
            labels={state.age.labels}
          />
        </div>
      </div>
    </div>
  );
};
