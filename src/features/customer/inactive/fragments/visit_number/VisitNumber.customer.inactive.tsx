import { useContext } from "react";
import clsx from "clsx";
import { CustomerInactiveContext } from "../../context/CustomerInactive.context";
import { CustomerInactiveActionEnum } from "../../context/CustomerInactive.types";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { LocaleRoute } from "src/core/utils/router/constants";
import { Dropdown } from "src/core/ui/components/dropdown";
import { getVisitNumbers } from "../../utils/visit_numbers";

export const VisitNumberCustomerInactive = () => {
  const { state, dispatch } = useContext(CustomerInactiveContext);
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const handleSelect = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerInactiveActionEnum.SelectVisitNumber,
      payload: data,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full place-content-start place-items-start gap-x-[1rem]"
      )}
    >
      <Dropdown
        label={dictionaries.visit_number_filter.label}
        selected={state.threshold.visit_number.selected}
        items={getVisitNumbers({ locale: locale ?? LocaleRoute.default })}
        onSelect={handleSelect}
      />
    </div>
  );
};
