import { useContext } from "react";
import { CustomerStatisticsContext } from "../../contexts/CustomerStatistics.context";
import { useCustomerStatisticsGetGenderStatistics } from "../../react_query/hooks/useGetGenderStatistics.statistics";
import clsx from "clsx";
import { GenderPieChartCustomerStatistics } from "../../components/gender_pie_chart";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const GenderCustomerStatistics = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerStatisticsContext);
  const { isFetching: isFetchingGetGenderStatistics } =
    useCustomerStatisticsGetGenderStatistics();

  if (isFetchingGetGenderStatistics) {
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
          {dictionaries.gender_card.title}
        </h3>
      </div>

      <GenderPieChartCustomerStatistics
        data={state.gender.data}
        labels={state.gender.labels.map((item) => {
          const translatedLabel =
            appDictionaries.gender.items.find(
              (genderItem) => genderItem.id === item
            )?.name ?? "";
          return translatedLabel;
        })}
      />
    </div>
  );
};
