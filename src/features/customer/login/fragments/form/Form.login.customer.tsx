import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import {
  useUserScalpScanPostSendOTP,
  useUserScalpScanPostAccessToken,
} from "src/features/customer/login/react_query/hooks";

import { Divider } from "src/core/ui/components/divider";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";
import { LocaleRoute } from "src/core/utils/router/constants";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { CustomerLoginActionEnum, CustomerLoginContext } from "../../context";
import { Button } from "src/core/ui/components/button";
import { Phonefield } from "src/core/ui/components/phonefield";
import { OTP } from "src/core/ui/components/otp";

export const FormLoginCustomer = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale ?? LocaleRoute.default);
  const dictionaries = getDictionaries(locale);
  const { mutate: sendOTP, isPending: isPendingSendOTP } =
    useUserScalpScanPostSendOTP();
  const { mutate: login } = useUserScalpScanPostAccessToken();
  const { state, dispatch } = useContext(CustomerLoginContext);

  useEffect(() => {
    dispatch({
      type: CustomerLoginActionEnum.SetFormData,
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

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: CustomerLoginActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: data,
        },
      },
    });
  };

  const handleSendOTP = () => {
    sendOTP();
  };

  const handleCloseOTP = () => {
    dispatch({
      type: CustomerLoginActionEnum.SetFormData,
      payload: {
        ...state.form,
        otp: {
          ...state.form.otp,
          verified: undefined,
          feature: {
            ...state.form.otp.feature,
            is_open: false,
          },
        },
      },
    });
  };

  const handleSubmitOTP = (data: string) => {
    login(data);
  };

  const handleClickLogin = (_: React.MouseEvent<HTMLButtonElement>) => {
    sendOTP();
  };

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

  const isSubmitDisabled =
    isPhonenumberError ||
    !state.form.phonenumber.value.length ||
    isPendingSendOTP;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[2rem]",
        "w-full"
      )}
    >
      <div
        id={"header"}
        className={clsx(
          "grid grid-cols-2 justify-between justify-items-start items-center content-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] justify-start justify-items-start items-center content-center"
          )}
        >
          <div
            className={clsx(
              "grid gap-y-[0.5rem] grid-cols-1 content-center items-center justify-start justify-items-start"
            )}
          >
            <h1 className={clsx("text-[2rem] text-white font-bold")}>
              {dictionaries.form.name.toUpperCase()}
            </h1>
            <p className={clsx("text-[1.125rem] text-white font-regular")}>
              {dictionaries.form.description}
            </p>
          </div>
        </div>
      </div>

      <Divider />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <Phonefield
          textfield={{
            label: dictionaries.form.phonenumber.label,
            placeholder: dictionaries.form.phonenumber.placeholder,
            maxLength: dictionaries.form.phonenumber.max_length,
            value: state.form.phonenumber.value,
            startHelper: phoneNumberErrorMessage,
            variant: isPhonenumberError ? "error" : "standard",
          }}
          country_code={{
            type: "bottom_sheet",
            title: dictionaries.form.phonenumber.country_code.title,
            search: {
              placeholder:
                dictionaries.form.phonenumber.country_code.placeholder,
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

        <Button
          variant={"contained"}
          disabled={isSubmitDisabled}
          onClick={handleClickLogin}
        >
          {isPendingSendOTP && <MoonLoader />}
          {dictionaries.form.login.toUpperCase()}
        </Button>
      </div>

      {/* otp */}
      <OTP
        type="bottom_sheet"
        otp={{
          open: state.form.otp.feature.is_open,
          title: dictionaries.form.otp_bottom_sheet.message,
          message: dictionaries.form.otp_bottom_sheet.description,
          description: state.form.phonenumber.value,
          error:
            state.form.otp.verified || state.form.otp.verified === undefined
              ? null
              : {
                  message: dictionaries.form.otp_bottom_sheet.error_message,
                },
          cta: {
            primary: {
              children: dictionaries.form.otp_bottom_sheet.send_otp,
              onClick: handleSendOTP,
            },
          },

          onClose: handleCloseOTP,
          onSubmit: handleSubmitOTP,
        }}
      />
    </div>
  );
};
