import { useContext } from "react";
import clsx from "clsx";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Dropdown } from "src/core/ui/components/dropdown";
import { Autocomplete } from "src/core/ui/components/autocomplete";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { getAgeResolution, getAges } from "../../utils";
import { LocaleRoute } from "src/core/utils/router/constants";

export const AgeDistributionFilterCustomerInactive = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerInactiveContext);

  const handleSelectStartAge = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectStartAge,
      payload: data,
    });
  };

  const handleSelectEndAge = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectEndAge,
      payload: data,
    });
  };

  const handleSelectAgeResolution = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectAgeResolution,
      payload: data,
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectGender,
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
        label={dictionaries.resolution_filter.label}
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
