import { useParams } from "react-router-dom";
import clsx from "clsx";
import { AgeCustomerStatistics } from "../fragments/customer_age_distribution/CustomerAgeDistribution.statistics";
import { GenderCustomerStatistics } from "../fragments/gender/Gender.customer.statistics";
import { RaceCustomerStatistics } from "../fragments/race/Race.customer.statistics";
import { AgeFilterCustomerStatistics } from "../fragments/age_filter/AgeFilter.customer.statistics";
import { getDictionaries } from "../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { LocaleRoute } from "src/core/utils/router/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { HeaderCustomerStatistics } from "../fragments/header";
import { useContext, useEffect } from "react";
import { CustomerStatisticsContext } from "../contexts/CustomerStatistics.context";
import { CustomerStatisticsActionEnum } from "../contexts";
import { getAgeResolution, getAges } from "../utils";
import { Card } from "src/core/ui/components/card/Card";

export const CustomerStatisticsContainer = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerStatisticsContext);

  useEffect(() => {
    dispatch({
      type: CustomerStatisticsActionEnum.SetAgeData,
      payload: {
        ...state.age,
        start_age: {
          ...state.age.start_age,
          selected:
            getAges({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id === "1"
            ) ?? null,
        },
        end_age: {
          ...state.age.start_age,
          selected:
            getAges({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id === "100"
            ) ?? null,
        },
        resolution: {
          ...state.age.resolution,
          selected:
            getAgeResolution({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id === "10"
            ) ?? null,
        },
        gender: {
          ...state.age.gender,
          selected:
            appDictionaries.gender.items.find(
              (item) => item.id === "All Gender"
            ) ?? null,
        },
      },
    });
  }, [locale]);
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col items-start justify-start gap-[1.5rem]",
            "w-full h-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <HeaderCustomerStatistics />

          <div
            className={clsx(
              "grid grid-cols-1 sm:grid-cols-2 place-content-start place-items-start w-full gap-y-[1.5rem] gap-x-[2rem]"
            )}
          >
            <GenderCustomerStatistics />
            <RaceCustomerStatistics />
          </div>

          <AgeFilterCustomerStatistics />

          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <AgeCustomerStatistics />
          </div>
          <Button variant={"outlined"} href={"#"}>
            {dictionaries.actions.back.toUpperCase()}
          </Button>
        </div>
      </Card>
    </AppContainer>
  );
};
