import { useContext, useEffect } from "react";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { Tabs } from "src/core/ui/components/tabs";
import { Tab } from "src/core/ui/components/tab";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { LocaleRoute } from "src/core/utils/router/constants";
import { useParams } from "react-router-dom";
import { getAgeResolution, getAges } from "../../utils";

export const SectionCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerInactiveContext);

  useEffect(() => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectTabSection,
      payload: dictionaries.tab.items.find((_, index) => index === 0) ?? null,
    });
  }, []);

  const handleClickTab = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectTabSection,
      payload: data,
    });

    // NOTES: reset customer age filter
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

    // NOTES: reset rating filter
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
  };
  return (
    <Tabs>
      {dictionaries.tab.items.map((item, index) => (
        <Tab
          key={index}
          selected={item.id === state.section.tab.selected?.id}
          onClick={() => handleClickTab(item)}
        >
          {item.name}
        </Tab>
      ))}
    </Tabs>
  );
};
