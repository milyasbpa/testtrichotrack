import { useCallback, useContext } from "react";
import clsx from "clsx";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { CustomerBusinessAnalyticsActionEnum } from "../../contexts/CustomerBusinessAnalytics.types";
import DatePickerDropdownBusinessAnalytics from "../../components/date_picker_dropdown/DatePickerDropdown.business_analytics";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Dropdown } from "src/core/ui/components/dropdown";
import { Autocomplete } from "src/core/ui/components/autocomplete";

export const CustomerFilterBusinessAnalytics = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerBusinessAnalyticsContext);

  const handleSelectResolution = useCallback(
    (data: { id: string; name: string }) => {
      dispatch({
        type: CustomerBusinessAnalyticsActionEnum.SelectResolution,
        payload: data,
      });
    },
    []
  );

  const handlePickDate = useCallback(
    (data: { startDate: string; endDate: string }) => {
      dispatch({
        type: CustomerBusinessAnalyticsActionEnum.SelectDate,
        payload: {
          start_date: data.startDate,
          end_date: data.endDate,
        },
      });
    },
    []
  );

  const handleChangeOutlet = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerBusinessAnalyticsActionEnum.FilterByOutlet,
      payload: data,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-3 w-full place-content-start place-items-start gap-x-[1rem]"
      )}
    >
      <Dropdown
        items={appDictionaries.resolution.business_analytics.items}
        label={dictionaries.resolution_filter.label}
        onSelect={handleSelectResolution}
      />
      <DatePickerDropdownBusinessAnalytics
        label={dictionaries.date_filter.label}
        startDate={state.filter.start_date}
        endDate={state.filter.end_date}
        resolution={(state.filter.resolution.selected?.id ?? "").toLowerCase()}
        numberOfResolution={30}
        onPickDate={handlePickDate}
      />
      <Autocomplete
        selected={state.filter.outlets.selected}
        items={state.filter.outlets.data}
        onSelect={handleChangeOutlet}
      />
    </div>
  );
};
