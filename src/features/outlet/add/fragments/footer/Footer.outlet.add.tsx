import clsx from "clsx";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { useContext } from "react";
import { OutletAddActionEnum, OutletAddContext } from "../../contexts";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const FooterOutletAdd = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(OutletAddContext);
  const appDictionaries = getAppDictionaries(locale);

  const countryCodeValue = state.form.phonenumber.value.slice(0, 3);
  const selectedPhonenumberItem =
    appDictionaries.phone_number.items.find(
      (item) => item.id === countryCodeValue
    ) ?? null;
  const selectedPhonenumberRegex = !selectedPhonenumberItem
    ? null
    : new RegExp(selectedPhonenumberItem.regex);
  const isPhonenumberError = !state.form.phonenumber.value.slice(3).length
    ? false
    : !selectedPhonenumberRegex
    ? false
    : !selectedPhonenumberRegex.test(state.form.phonenumber.value);

  const isSubmitDisabled =
    isPhonenumberError ||
    !state.form.phonenumber.value.length ||
    !state.form.fullname.value.length;

  const handleSubmit = () => {
    dispatch({
      type: OutletAddActionEnum.OpenConfirmationModal,
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-x-[1.5rem]",
        "w-full",
        "box-border"
      )}
    >
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

      <Button disabled={isSubmitDisabled} onClick={handleSubmit}>
        {dictionaries.actions.submit.toUpperCase()}
      </Button>
    </div>
  );
};
