import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Divider } from "src/core/ui/components/divider";
import { StaffLoginContext, StaffLoginActionEnum } from "../../context";
import { useParams } from "react-router-dom";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { useStaffLoginPostAccessToken } from "../../react_query/hooks";
import { Button } from "src/core/ui/components/button";
import { Phonefield } from "src/core/ui/components/phonefield";
import { PasswordField } from "src/core/ui/components/passwordfield";

export const FormLoginStaff = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);

  const { state, dispatch } = useContext(StaffLoginContext);
  const { onSubmit, isPending } = useStaffLoginPostAccessToken();

  useEffect(() => {
    dispatch({
      type: StaffLoginActionEnum.SetFormData,
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
      type: StaffLoginActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: data,
        },
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: StaffLoginActionEnum.SetFormData,
      payload: {
        ...state.form,
        password: {
          ...state.form.password,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleClickLogin = (_: React.MouseEvent<HTMLButtonElement>) => {
    onSubmit();
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
    ? dictionaries.staff_login.form.phonenumber.errors.find(
        (item) => item.id === "INVALID_PHONE_NUMBER"
      )?.name ?? ""
    : "";

  const isSubmitDisabled =
    isPhonenumberError ||
    !state.form.phonenumber.value.length ||
    !state.form.password.value.length ||
    isPending;

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
              {dictionaries.staff_login.form.name.toUpperCase()}
            </h1>
            <p className={clsx("text-[1.125rem] text-white font-regular")}>
              {dictionaries.staff_login.form.description}
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
            label: dictionaries.staff_login.form.phonenumber.label,
            placeholder: dictionaries.staff_login.form.phonenumber.placeholder,
            maxLength: dictionaries.staff_login.form.phonenumber.max_length,
            value: state.form.phonenumber.value,
            startHelper: phoneNumberErrorMessage,
            variant: isPhonenumberError ? "error" : "standard",
          }}
          country_code={{
            type: "bottom_sheet",
            title: dictionaries.staff_login.form.phonenumber.country_code.title,
            search: {
              placeholder:
                dictionaries.staff_login.form.phonenumber.country_code
                  .placeholder,
              errorMessage:
                dictionaries.staff_login.form.phonenumber.country_code.errors.find(
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

        <PasswordField
          label={dictionaries.staff_login.form.password.label}
          placeholder={dictionaries.staff_login.form.password.placeholder}
          maxLength={dictionaries.staff_login.form.password.max_length}
          value={state.form.password.value}
          onChange={handleChangePassword}
        />

        <Button
          variant={"contained"}
          disabled={isSubmitDisabled}
          onClick={handleClickLogin}
        >
          {isPending && <MoonLoader />}
          {dictionaries.staff_login.form.login.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};
