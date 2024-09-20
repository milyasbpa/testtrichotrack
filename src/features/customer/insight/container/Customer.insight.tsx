import { useParams } from "react-router-dom";
import clsx from "clsx";
import { RatingCustomerInsight } from "../fragments/rating/Rating.customer.insight";
import { HeaderCustomerInsight } from "../fragments/header/Header.statistics";
import { FilterCustomerInsight } from "../fragments/filter/Filter.customer.insight";
import { Button } from "src/core/ui/components/button";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries } from "../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { useContext, useEffect } from "react";
import { CustomerInsightActionEnum, CustomerInsightContext } from "../context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { getAges } from "../utils";
import { RouterFunctions } from "src/core/utils/router/functions";

export const CustomerInsightContainer = () => {
  const { locale } = useParams();

  const { state, dispatch } = useContext(CustomerInsightContext);
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);

  // NOTES: Data Initialization
  useEffect(() => {
    dispatch({
      type: CustomerInsightActionEnum.SetFilterData,
      payload: {
        ...state.filter,
        start_age: {
          ...state.filter.start_age,
          selected:
            getAges({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id == "30"
            ) ?? null,
        },
        end_age: {
          ...state.filter.end_age,
          selected:
            getAges({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id == "40"
            ) ?? null,
        },
        gender: {
          ...state.filter.gender,
          selected:
            appDictionaries.gender.items.find(
              (item) => item.id === "All Gender"
            ) ?? null,
        },
        race: {
          ...state.filter.race,
          selected:
            appDictionaries.race.items.find((item) => item.id === "All Race") ??
            null,
        },
        resolution: {
          ...state.filter.resolution,
          selected:
            appDictionaries.resolution.rating.items.find(
              (item) => item.id === "1"
            ) ?? null,
        },
      },
    });
  }, [locale]);
  return (
    <AppContainer>
      <Card className={clsx("!bg-white-04")}>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]",
            "p-[1rem]"
          )}
        >
          <HeaderCustomerInsight />

          <FilterCustomerInsight />

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
            )}
          >
            <RatingCustomerInsight />
          </div>

          <Button
            variant={"outlined"}
            href={RouterFunctions.setBackURL({
              defaultURL: PrivateRouteURL.routeToStaffDashboardURL({
                locale: locale,
              }),
            })}
          >
            {dictionaries.actions.back.toUpperCase()}
          </Button>
        </div>
      </Card>
    </AppContainer>
  );
};
