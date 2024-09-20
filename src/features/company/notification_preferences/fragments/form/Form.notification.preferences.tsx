import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { ClientNotificationPreferencesContext } from "../../contexts/NotificationPreferences.company.context";
import { ClientNotificationPreferencesActionEnum } from "../../contexts/NotificationPreferences.company.types";
import { useNotificationPreferencesPutNotificationPreference } from "../../react_query/hooks/usePutNotificationPreference.notification_preference";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { REGEX } from "src/core/utils/formatters";
import { Textfield } from "src/core/ui/components/textfield";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Phonefield } from "src/core/ui/components/phonefield";
import { RegexFunctions } from "src/core/utils/validations";
import {
  useNotificationPreferencesGetCurrentTier,
  useNotificationPreferencesGetNotificationPreference,
} from "../../react_query/hooks";
import { MoonLoader } from "src/core/ui/components/moon_loader";

export const FormNotificationPreferences = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = React.useContext(
    ClientNotificationPreferencesContext
  );

  const appDictionaries = getAppDictionaries(locale);
  const { isFetching: isFetchingGetCurrentTier } =
    useNotificationPreferencesGetCurrentTier();
  const { isFetching: isFetchingGetNotificationPreference } =
    useNotificationPreferencesGetNotificationPreference();
  const {
    mutate: updateNotificationPreference,
    isPending: isPendingUpdateNotificationPreference,
  } = useNotificationPreferencesPutNotificationPreference();
  const isFetching =
    isFetchingGetCurrentTier || isFetchingGetNotificationPreference;
  const isPending = isPendingUpdateNotificationPreference;
  React.useEffect(() => {
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value:
            appDictionaries.phone_number.items.find((item) => item.id === "+65")
              ?.id ?? "",
        },
      },
    });
  }, []);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormEmailValue,
      payload: e.currentTarget.value,
    });
  };

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: data,
        },
      },
    });
  };

  const handleBlurEmail = () => {
    const trimmedValue = state.form.email.value.trim();
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormEmailValue,
      payload: trimmedValue,
    });
  };

  const handleChangeSubscriptionThreshold = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (REGEX.number_only.test(e.currentTarget.value)) {
      dispatch({
        type: ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdValue,
        payload: e.currentTarget.value,
      });
      if (!e.currentTarget.value.length) {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdError,
          payload: {
            code: dictionaries.form.subscription_threshold.error
              .subscription_threshold_must_positive_integer.code,
            condition: true,
          },
        });
      } else if (REGEX.zero_in_the_beginning.test(e.currentTarget.value)) {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdError,
          payload: {
            code: dictionaries.form.subscription_threshold.error
              .subscription_threshold_must_positive_integer.code,
            condition: true,
          },
        });
      } else {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdError,
          payload: {
            code: "",
            condition: false,
          },
        });
      }
    }
  };

  const handleBlurSubscriptionThreshold = () => {
    const trimmedValue = state.form.subscription_threshold.value.trim();
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormSubscriptionThresholdValue,
      payload: trimmedValue,
    });
  };

  const handleChangeCreditThreshold = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (REGEX.number_only.test(e.currentTarget.value)) {
      dispatch({
        type: ClientNotificationPreferencesActionEnum.SetFormCreditThresholdValue,
        payload: e.currentTarget.value,
      });
      if (!e.currentTarget.value.length) {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormCreditThresholdError,
          payload: {
            code: dictionaries.form.credit_threshold.error
              .credit_threshold_must_positive_integer.code,
            condition: true,
          },
        });
      } else if (REGEX.zero_in_the_beginning.test(e.currentTarget.value)) {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormCreditThresholdError,
          payload: {
            code: dictionaries.form.credit_threshold.error
              .credit_threshold_must_positive_integer.code,
            condition: true,
          },
        });
      } else {
        dispatch({
          type: ClientNotificationPreferencesActionEnum.SetFormCreditThresholdError,
          payload: {
            code: "",
            condition: false,
          },
        });
      }
    }
  };

  const handleBlurCreditThreshold = () => {
    const trimmedValue = state.form.credit_threshold.value.trim();
    dispatch({
      type: ClientNotificationPreferencesActionEnum.SetFormCreditThresholdValue,
      payload: trimmedValue,
    });
  };

  const isAnyEmailCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.email.schemas,
    value: state.form.email.value,
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
  const phoneNumberErrorMessage = isPhonenumberError
    ? dictionaries.form.phonenumber.errors.find(
        (item) => item.id === "INVALID_PHONE_NUMBER"
      )?.name ?? ""
    : "";

  const handleClickSave = () => {
    updateNotificationPreference();
  };

  const isSaveDisabled =
    !state.form.email.value.length ||
    isAnyEmailCriteriaError ||
    !state.form.subscription_threshold.value.length ||
    state.form.subscription_threshold.error.condition ||
    isPhonenumberError ||
    !state.form.credit_threshold.value.length ||
    state.form.credit_threshold.error.condition ||
    isPending;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
      )}
    >
      <Textfield
        label={dictionaries.form.email.label}
        placeholder={dictionaries.form.email.placeholder}
        value={state.form.email.value}
        loading={isFetching}
        startHelper={
          !state.form.email.value.length
            ? ""
            : isAnyEmailCriteriaError
            ? appDictionaries.validations.email.schemas.find(
                (item) => item.id === "valid_email"
              )?.name ?? ""
            : ""
        }
        variant={
          !state.form.email.value.length
            ? "standard"
            : isAnyEmailCriteriaError
            ? "error"
            : "standard"
        }
        onChange={handleChangeEmail}
        onBlur={handleBlurEmail}
      />

      <Phonefield
        textfield={{
          label: dictionaries.form.phonenumber.label,
          placeholder: dictionaries.form.phonenumber.placeholder,
          maxLength: dictionaries.form.phonenumber.max_length,
          value: state.form.phonenumber.value,
          startHelper: phoneNumberErrorMessage,
          loading: isFetching,
          variant: isPhonenumberError ? "error" : "standard",
        }}
        country_code={{
          type: "modal",
          title: dictionaries.form.phonenumber.country_code.title,
          search: {
            placeholder: dictionaries.form.phonenumber.country_code.placeholder,
            errorMessage:
              dictionaries.form.phonenumber.country_code.errors.find(
                (item) => item.id === "COUNTRY_NOT_FOUND"
              )?.name ?? "",
          },
          items: appDictionaries.phone_number.items.map((item) => {
            return {
              id: item.id,
              name: item.country,
              image_url: item.image_url,
            };
          }),
        }}
        value={state.form.phonenumber.value}
        onChange={handleChangePhonenumber}
      />

      {state.form.type === "credit" ? (
        <Textfield
          label={dictionaries.form.credit_threshold.label}
          placeholder={dictionaries.form.credit_threshold.placeholder}
          value={state.form.credit_threshold.value}
          variant={
            !state.form.credit_threshold.value.length ||
            state.form.credit_threshold.error.condition
              ? "error"
              : "standard"
          }
          endAddornment={
            <p className={clsx("text-[1rem] text-[white] font-normal")}>
              {dictionaries.form.credit_threshold.unit}
            </p>
          }
          startHelper={dictionaries.form.credit_threshold.helper_text}
          loading={isFetching}
          onBlur={handleBlurCreditThreshold}
          onChange={handleChangeCreditThreshold}
        />
      ) : (
        <Textfield
          label={dictionaries.form.subscription_threshold.label}
          placeholder={dictionaries.form.subscription_threshold.placeholder}
          value={state.form.subscription_threshold.value}
          variant={
            !state.form.subscription_threshold.value.length ||
            state.form.subscription_threshold.error.condition
              ? "error"
              : "standard"
          }
          endAddornment={
            <p className={clsx("text-[1rem] text-[white] font-normal")}>
              {dictionaries.form.subscription_threshold.unit}
            </p>
          }
          startHelper={dictionaries.form.subscription_threshold.helper_text}
          loading={isFetching}
          onBlur={handleBlurSubscriptionThreshold}
          onChange={handleChangeSubscriptionThreshold}
        />
      )}

      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {/* back */}
        <Button
          variant={"outlined"}
          href={RouterFunctions.setBackURL({
            defaultURL: PrivateRouteURL.routeToCompanyBillingURL({
              locale: locale,
            }),
          })}
        >
          {dictionaries.form.cta.secondary.children.toUpperCase()}
        </Button>
        {/* end back */}
        {/* save */}
        <Button disabled={isSaveDisabled} onClick={handleClickSave}>
          {isPending && <MoonLoader />}
          {dictionaries.form.cta.primary.children.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};
