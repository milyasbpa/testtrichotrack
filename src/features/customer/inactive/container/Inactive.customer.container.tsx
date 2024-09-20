import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { AgeDistributionCustomerInactive } from "../fragments/age_distribution";
import { GenderCustomerInactive } from "../fragments/gender";
import { RaceCustomerInactive } from "../fragments/race/Race.customer.inactive";
import { AgeDistributionFilterCustomerInactive } from "../fragments/age_distribution_filter/AgeDistributionFilter.customer.inactive";
import { VisitNumberCustomerInactive } from "../fragments/visit_number/VisitNumber.customer.inactive";
import { SectionCustomerInactive } from "../fragments/section/Section.customer.inactive";
import { CustomerInactiveContext } from "../context/CustomerInactive.context";
import { RatingFilterCustomerInactive } from "../fragments/rating_filter/RatingFilter.customer.inactive";
import { RatingCustomerInactive } from "../fragments/rating/Rating.customer.inactive";
import { Button } from "src/core/ui/components/button";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries } from "../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { HeaderCustomerInactive } from "../fragments/header";
import { Card } from "src/core/ui/components/card/Card";
import { CustomerInactiveActionEnum } from "../context";
import { getAgeResolution, getAges } from "../utils";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { getVisitNumbers } from "../utils/visit_numbers";

export const CustomerInactiveContainer = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);

  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);

  // NOTES: Data Initialization
  useEffect(() => {
    // Threshold
    dispatch({
      type: CustomerInactiveActionEnum.SetThresholdData,
      payload: {
        ...state.threshold,
        visit_number: {
          ...state.threshold.visit_number,
          selected:
            getVisitNumbers({ locale: locale ?? LocaleRoute.default }).find(
              (item) => item.id == "1"
            ) ?? null,
        },
      },
    });
    // Age
    dispatch({
      type: CustomerInactiveActionEnum.SetAgeData,
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

    // Ratings
    dispatch({
      type: CustomerInactiveActionEnum.SetRatingData,
      payload: {
        ...state.rating,
        filter: {
          ...state.rating.filter,
          start_age: {
            ...state.rating.filter.start_age,
            selected:
              getAges({ locale: locale ?? LocaleRoute.default }).find(
                (item) => item.id == "30"
              ) ?? null,
          },
          end_age: {
            ...state.rating.filter.end_age,
            selected:
              getAges({ locale: locale ?? LocaleRoute.default }).find(
                (item) => item.id == "40"
              ) ?? null,
          },
          gender: {
            ...state.rating.filter.gender,
            selected:
              appDictionaries.gender.items.find(
                (item) => item.id === "All Gender"
              ) ?? null,
          },
          race: {
            ...state.rating.filter.race,
            selected:
              appDictionaries.race.items.find(
                (item) => item.id === "All Race"
              ) ?? null,
          },
          resolution: {
            ...state.rating.filter.resolution,
            selected:
              appDictionaries.resolution.rating.items.find(
                (item) => item.id === "1"
              ) ?? null,
          },
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
          <HeaderCustomerInactive />

          <VisitNumberCustomerInactive />

          <SectionCustomerInactive />

          {state.section.tab.selected?.id === "statistics" && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-2 place-content-start place-items-start w-full gap-y-[1.5rem] gap-x-[2rem]"
                )}
              >
                <GenderCustomerInactive />
                <RaceCustomerInactive />
              </div>

              <AgeDistributionFilterCustomerInactive />

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
                )}
              >
                <AgeDistributionCustomerInactive />
              </div>
            </div>
          )}

          {state.section.tab.selected?.id === "insight" && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
              )}
            >
              <RatingFilterCustomerInactive />
              <RatingCustomerInactive />
            </div>
          )}

          <Button
            href={PrivateRouteURL.routeToStaffDashboardURL({
              locale: locale ?? LocaleRoute.default,
            })}
            variant={"outlined"}
          >
            {dictionaries.actions.back.toUpperCase()}
          </Button>
        </div>
      </Card>
    </AppContainer>
  );
};
