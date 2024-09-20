import { useContext } from "react";
import clsx from "clsx";
import { RatingCardCustomerInsight } from "../../components/rating_card/RatingCard.insight";
import { CustomerInsightContext } from "../../context";
import { useCustomerInsightGetRatingStatistic } from "../../react_query/hooks/useGetRatingStatistics.insight";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const RatingCustomerInsight = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerInsightContext);
  const { isFetching: isFetchingGetRatingStatistics } =
    useCustomerInsightGetRatingStatistic();
  if (isFetchingGetRatingStatistics) {
    return null;
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
      )}
    >
      {Object.keys(state.rating).map((key) => {
        return (
          <RatingCardCustomerInsight
            key={key}
            name={
              appDictionaries.hair_diagnosis.items.find(
                (item) => item.id === key
              )?.name ?? ""
            }
            data={state.rating[key].data}
            labels={state.rating[key].labels}
          />
        );
      })}
    </div>
  );
};
