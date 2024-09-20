import { useContext } from "react";
import clsx from "clsx";
import {
  CustomerInsightContext,
  CustomerInsightActionEnum,
} from "../../context";
import { getAges, insightBarChartDataFormatter } from "../../utils";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { LocaleRoute } from "src/core/utils/router/constants";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Dropdown } from "src/core/ui/components/dropdown";
import { AgeRangeAutocompleteCustomerInsight } from "../../components/age_range_autocomplete";

export const FilterCustomerInsight = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state, dispatch } = useContext(CustomerInsightContext);

  const handleSelectAge = (data: {
    minAge: { id: string; name: string } | null;
    maxAge: { id: string; name: string } | null;
  }) => {
    dispatch({
      type: CustomerInsightActionEnum.SetFilterData,
      payload: {
        ...state.filter,
        start_age: {
          ...state.filter.start_age,
          selected: data.minAge,
        },
        end_age: {
          ...state.filter.end_age,
          selected: data.maxAge,
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInsightActionEnum.SetFilterData,
      payload: {
        ...state.filter,
        gender: {
          ...state.filter.gender,
          selected: data,
        },
      },
    });
  };

  const handleSelectRace = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInsightActionEnum.SetFilterData,
      payload: {
        ...state.filter,
        race: {
          ...state.filter.race,
          selected: data,
        },
      },
    });
  };

  const handleSelectResolution = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInsightActionEnum.SetFilterData,
      payload: {
        ...state.filter,
        resolution: {
          ...state.filter.resolution,
          selected: data,
        },
      },
    });

    dispatch({
      type: CustomerInsightActionEnum.SetRatingData,
      payload: Object.keys(state.rating).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            ...state.rating[key],
            data: insightBarChartDataFormatter(
              state.rating[key].raw_data,
              eval(data.id),
              5
            ),
          },
        };
      }, {}),
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-5 w-full place-content-start place-items-start gap-x-[1rem]"
      )}
    >
      <AgeRangeAutocompleteCustomerInsight
        minAge={{
          label: dictionaries.min_age_filter.label,
          selected: state.filter.start_age.selected,
          items: getAges({ locale: locale ?? LocaleRoute.default }),
        }}
        maxAge={{
          label: dictionaries.max_age_filter.label,
          selected: state.filter.end_age.selected,
          items: getAges({ locale: locale ?? LocaleRoute.default }),
        }}
        onSelectAge={handleSelectAge}
      />
      <Dropdown
        label={dictionaries.gender_filter.label}
        selected={state.filter.gender.selected}
        items={appDictionaries.gender.items}
        onSelect={handleSelectGender}
      />
      <Dropdown
        label={dictionaries.race_filter.label}
        selected={state.filter.race.selected}
        items={appDictionaries.race.items}
        onSelect={handleSelectRace}
      />
      <Dropdown
        label={dictionaries.resolution_filter.label}
        selected={state.filter.resolution.selected}
        items={appDictionaries.resolution.rating.items}
        onSelect={handleSelectResolution}
      />
    </div>
  );
};
