import { useContext } from "react";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { useCustomerInactiveGetGenderStatistics } from "../../react_query/hooks/useGetGenderStatistics.inactive";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { GenderPieChartInactive } from "../../components/gender_pie_chart/GenderPieChart.inactive";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const GenderCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerInactiveContext);
  const { isFetching: isFetchingGetGenderStatistics } =
    useCustomerInactiveGetGenderStatistics();

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

      <GenderPieChartInactive
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
