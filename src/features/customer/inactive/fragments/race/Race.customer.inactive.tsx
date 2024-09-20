import { useContext } from "react";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { useCustomerInactiveGetRaceStatistics } from "../../react_query/hooks/useGetRaceStatistics.inactive";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";
import { RacePieChartInactive } from "../../components/race_pie_chart/RacePieChart.inactive";

export const RaceCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerInactiveContext);
  const { isFetching: isFetchingGetRaceStatistics } =
    useCustomerInactiveGetRaceStatistics();

  if (isFetchingGetRaceStatistics) {
    return null;
  }

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
          {dictionaries.race_card.title}
        </h3>
      </div>

      <RacePieChartInactive
        data={state.race.data}
        labels={state.gender.labels.map((item) => {
          const translatedLabel =
            appDictionaries.race.items.find((raceItem) => raceItem.id === item)
              ?.name ?? "";
          return translatedLabel;
        })}
      />
    </div>
  );
};
