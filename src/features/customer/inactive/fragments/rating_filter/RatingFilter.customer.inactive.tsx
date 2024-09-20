import { useContext } from "react";
import clsx from "clsx";
import { insightBarChartDataFormatter } from "../../utils";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Dropdown } from "src/core/ui/components/dropdown";
import { AgeRangeAutocompleteCustomerInactive } from "../../components/age_range_autocomplete/AgeRangeAutocomplete.inactive";

export const RatingFilterCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerInactiveContext);

  const handleSelectAge = (data: {
    minAge: { id: string; name: string } | null;
    maxAge: { id: string; name: string } | null;
  }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SetRatingData,
      payload: {
        ...state.rating,
        filter: {
          ...state.rating.filter,
          start_age: {
            ...state.rating.filter.start_age,
            selected: data.minAge,
          },
          end_age: {
            ...state.rating.filter.end_age,
            selected: data.maxAge,
          },
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SetRatingData,
      payload: {
        ...state.rating,
        filter: {
          ...state.rating.filter,
          gender: {
            ...state.rating.filter.gender,
            selected: data,
          },
        },
      },
    });
  };

  const handleSelectRace = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SetRatingData,
      payload: {
        ...state.rating,
        filter: {
          ...state.rating.filter,
          race: {
            ...state.rating.filter.race,
            selected: data,
          },
        },
      },
    });
  };

  const handleSelectResolution = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SetRatingData,
      payload: {
        ...state.rating,
        filter: {
          ...state.rating.filter,
          resolution: {
            ...state.rating.filter.resolution,
            selected: data,
          },
        },
      },
    });

    dispatch({
      type: CustomerInactiveActionEnum.SetRatingChartData,
      payload: Object.keys(state.rating.chart).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            ...state.rating.chart[key],
            data: insightBarChartDataFormatter(
              state.rating.chart[key].raw_data,
              eval(data.id ?? "1"),
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
      <AgeRangeAutocompleteCustomerInactive
        minAge={{
          label: dictionaries.min_age_filter.label,
          selected: state.rating.filter.start_age.selected,
        }}
        maxAge={{
          label: dictionaries.max_age_filter.label,
          selected: state.rating.filter.end_age.selected,
        }}
        onSelectAge={handleSelectAge}
      />
      <Dropdown
        label={dictionaries.gender_filter.label}
        selected={state.rating.filter.gender.selected}
        items={appDictionaries.gender.items}
        onSelect={handleSelectGender}
      />
      <Dropdown
        label={dictionaries.race_filter.label}
        selected={state.rating.filter.race.selected}
        items={appDictionaries.race.items}
        onSelect={handleSelectRace}
      />
      <Dropdown
        label={dictionaries.resolution_filter.label}
        selected={state.rating.filter.resolution.selected}
        items={appDictionaries.resolution.rating.items}
        onSelect={handleSelectResolution}
      />
    </div>
  );
};
