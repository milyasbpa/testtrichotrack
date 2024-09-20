import { useContext } from "react";
import clsx from "clsx";
import { RatingCardInactive } from "../../components/rating_card/RatingCard.inactive";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { useCustomerInactiveGetRatingStatistic } from "../../react_query/hooks/useGetRatingStatistics.inactive";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const RatingCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerInactiveContext);
  const { isFetching: isFetchingGetRatingStatistics } =
    useCustomerInactiveGetRatingStatistic();
  if (isFetchingGetRatingStatistics) {
    return null;
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
      )}
    >
      {Object.keys(state.rating.chart).map((key) => {
        return (
          <RatingCardInactive
            key={key}
            name={
              appDictionaries.hair_diagnosis.items.find(
                (item) => item.id === key
              )?.name ?? ""
            }
            data={state.rating.chart[key].data}
            labels={state.rating.chart[key].labels}
          />
        );
      })}
    </div>
  );
};
