import clsx from "clsx";
import { useParams } from "react-router-dom";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { RouterFunctions } from "src/core/utils/router/functions";
import { getDictionaries } from "../../i18n";
import { useContext } from "react";
import { StaffEditActionEnum, StaffEditContext } from "../../contexts";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { RegexFunctions } from "src/core/utils/validations";
import { AppContext } from "src/core/modules/app/context";

export const FooterStaffEdit = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffEditContext);

  const handleSubmit = () => {
    dispatch({
      type: StaffEditActionEnum.SetFormData,
      payload: {
        ...state.form,
        confirmation_modal: {
          ...state.form.confirmation_modal,
          open: true,
        },
      },
    });
  };

  const isAnyFullnameCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.fullname.schemas,
    value: state.form.fullname.value,
  });

  const isAnyPasswordCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.password.schemas,
    value: state.form.password.value,
  });

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
    isAnyFullnameCriteriaError ||
    (!!state.form.password.value.length ? isAnyPasswordCriteriaError : false) ||
    isPhonenumberError ||
    !state.form.fullname.value.length ||
    !state.form.phonenumber.value.length ||
    !state.form.permission.selected ||
    !state.form.outlets.selected;
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
          defaultURL:
            appState.auth.role === "ADMIN"
              ? PrivateRouteURL.routeToStaffsURL({
                  locale: locale,
                })
              : PrivateRouteURL.routeToStaffDashboardURL({
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
