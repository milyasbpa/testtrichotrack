import { useContext } from "react";
import clsx from "clsx";
import { CustomerStatisticsContext } from "../../contexts/CustomerStatistics.context";
import { CustomerStatisticsActionEnum } from "../../contexts/CustomerStatistics.types";
import { Dropdown } from "src/core/ui/components/dropdown";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";
import { LocaleRoute } from "src/core/utils/router/constants";
import { Autocomplete } from "src/core/ui/components/autocomplete";
import { getAgeResolution, getAges } from "../../utils";

export const AgeFilterCustomerStatistics = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerStatisticsContext);

  const handleSelectStartAge = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerStatisticsActionEnum.SelectStartAge,
      payload: data,
    });
  };

  const handleSelectEndAge = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerStatisticsActionEnum.SelectEndAge,
      payload: data,
    });
  };

  const handleSelectAgeResolution = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerStatisticsActionEnum.SelectAgeResolution,
      payload: data,
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerStatisticsActionEnum.SelectGender,
      payload: data,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-4 w-full place-content-start place-items-start gap-x-[1rem]"
      )}
    >
      <Autocomplete
        label={dictionaries.start_age_filter.label}
        items={getAges({ locale: locale ?? LocaleRoute.default })}
        selected={state.age.start_age.selected}
        onSelect={handleSelectStartAge}
      />
      <Autocomplete
        label={dictionaries.end_age_filter.label}
        items={getAges({ locale: locale ?? LocaleRoute.default })}
        selected={state.age.end_age.selected}
        onSelect={handleSelectEndAge}
      />
      <Dropdown
        label={dictionaries.age_resolution_filter.label}
        selected={state.age.resolution.selected}
        items={getAgeResolution({ locale: locale ?? LocaleRoute.default })}
        onSelect={handleSelectAgeResolution}
      />
      <Dropdown
        label={dictionaries.gender_filter.label}
        selected={state.age.gender.selected}
        items={appDictionaries.gender.items}
        onSelect={handleSelectGender}
      />
    </div>
  );
};
