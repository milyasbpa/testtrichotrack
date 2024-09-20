import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";

import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Textfield } from "src/core/ui/components/textfield";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Stepper } from "src/core/ui/components/stepper";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { Card } from "src/core/ui/components/card/Card";
import { RegexFunctions } from "src/core/utils/validations";
import { AvatarProfilePicture } from "src/core/ui/components/avatar_profile_picture";
import { Dropdown } from "src/core/ui/components/dropdown";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import { CheckboxGroup } from "src/core/ui/components/checkbox_group";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { useRequiredPostVerifyMobile } from "../../react_query/react_query";
import { BirthdateDropdown } from "src/core/ui/components/birthdate_dropdown";
import { Phonefield } from "src/core/ui/components/phonefield";
import { getDateNumbers } from "src/core/utils/generator";
import { OTP } from "src/core/ui/components/otp";

export const RequiredCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { mutate: sendOTP, isPending: isPendingSendOTP } =
    useRequiredPostVerifyMobile();
  const { state, dispatch } = useContext(CustomerRegistrationContext);

  React.useEffect(() => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        date_of_birth: {
          ...state.required_information.date_of_birth,
          value: moment().toISOString(),
        },
        phonenumber: {
          ...state.required_information.phonenumber,
          value:
            appDictionaries.phone_number.items.find((item) => item.id === "+65")
              ?.id ?? "",
        },
        race: {
          ...state.required_information.race,
          value:
            appDictionaries.race.items.find((item) => item.id === "Chinese") ??
            null,
        },
        gender: {
          ...state.required_information.gender,
          value:
            appDictionaries.gender.items.find((item) => item.id === "Male") ??
            null,
        },
      },
    });
  }, []);

  const handleClickTake = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickTakeProfilePictureRequiredInformation,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        fullname: {
          ...state.required_information.fullname,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleBlurFullname = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        fullname: {
          ...state.required_information.fullname,
          value: state.required_information.fullname.value.trim(),
        },
      },
    });
  };

  const handleSelectRace = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        race: {
          ...state.required_information.race,
          value: data,
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        gender: {
          ...state.required_information.gender,
          value: data,
        },
      },
    });
  };

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        phonenumber: {
          ...state.required_information.phonenumber,
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
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        otp: {
          ...state.required_information.otp,
          value: "",
          feature: {
            ...state.required_information.otp.feature,
            is_open: false,
          },
        },
      },
    });
  };

  const handleClickNext = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ChangeStateToAdditionalInformation,
    });
  };

  const handleSubmitOTP = (data: string) => {
    const isValid = data === state.required_information.otp.value;
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        otp: {
          ...state.required_information.otp,
          verified: isValid,
          feature: {
            ...state.required_information.otp.feature,
            is_open: !isValid,
          },
        },
      },
    });
  };

  const isAnyFullnameCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.fullname.schemas,
    value: state.required_information.fullname.value,
  });

  const countryCodeValue = state.required_information.phonenumber.value.slice(
    0,
    3
  );
  const selectedPhonenumberItem =
    appDictionaries.phone_number.items.find(
      (item) => item.id === countryCodeValue
    ) ?? null;
  const selectedPhonenumberRegex = !selectedPhonenumberItem
    ? null
    : new RegExp(selectedPhonenumberItem.regex);
  const isPhonenumberError =
    !state.required_information.phonenumber.value.slice(3).length
      ? false
      : !selectedPhonenumberRegex
      ? false
      : !selectedPhonenumberRegex.test(
          state.required_information.phonenumber.value
        );
  const phoneNumberErrorMessage = isPhonenumberError
    ? dictionaries.required.phonenumber.errors.find(
        (item) => item.id === "INVALID_PHONE_NUMBER"
      )?.name ?? ""
    : "";

  const isOTPButtonDisabled =
    isAnyFullnameCriteriaError ||
    isPhonenumberError ||
    state.required_information.phonenumber.value.length <= 3;

  const handleChangeBirthDate = (data: string) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetRequiredInformationData,
      payload: {
        ...state.required_information,
        date_of_birth: {
          ...state.required_information.date_of_birth,
          value: data,
        },
      },
    });
  };

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col items-start justify-start gap-[1.5rem]",
            "w-full h-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <Stepper selected={0} items={dictionaries.step.items} />

          <h2 className={clsx("text-[2rem] text-white font-bold text-left")}>
            {dictionaries.required.title}
          </h2>

          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[2rem] ",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 justify-center justify-items-center",
                  "w-full"
                )}
              >
                <AvatarProfilePicture
                  label={dictionaries.required.avatar_profile.take.toUpperCase()}
                  image={{
                    picture_url: !state.global.profile_picture.value.length
                      ? dictionaries.required.avatar_profile.image.default_url
                      : state.global.profile_picture.value,
                    banner_url:
                      dictionaries.required.avatar_profile.image.banner_url,
                  }}
                  onClick={handleClickTake}
                />
              </div>

              <Textfield
                label={dictionaries.required.fullname_input.label}
                placeholder={dictionaries.required.fullname_input.placeholder}
                value={state.required_information.fullname.value}
                startHelper={
                  !state.required_information.fullname.value.length
                    ? ""
                    : isAnyFullnameCriteriaError
                    ? appDictionaries.validations.fullname.schemas.find(
                        (item) => item.id === "valid_fullname"
                      )?.name ?? ""
                    : ""
                }
                variant={
                  !state.required_information.fullname.value.length
                    ? "standard"
                    : isAnyFullnameCriteriaError
                    ? "error"
                    : "standard"
                }
                onBlur={handleBlurFullname}
                onChange={handleChangeName}
              />

              <BirthdateDropdown
                label={dictionaries.required.date_of_birth_dropdown.label}
                date={{
                  placeholder:
                    dictionaries.required.date_of_birth_dropdown
                      .date_placeholder,
                  items: getDateNumbers({
                    locale: locale,
                    start: 1,
                    gap: 1,
                    length:
                      moment(
                        state.required_information.date_of_birth.value
                      ).year() === moment().year() &&
                      moment(
                        state.required_information.date_of_birth.value
                      ).month() === moment().month()
                        ? parseInt(moment().format("DD"))
                        : moment(
                            state.required_information.date_of_birth.value
                          ).daysInMonth(),
                    type: "asc",
                  }),
                }}
                month={{
                  placeholder:
                    dictionaries.required.date_of_birth_dropdown
                      .month_placeholder,
                  items:
                    moment(
                      state.required_information.date_of_birth.value
                    ).year() === moment().year()
                      ? appDictionaries.month.items
                          .filter(
                            (item) =>
                              parseInt(item.id) <=
                              parseInt(moment().format("MM"))
                          )
                          .map((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                            };
                          })
                      : appDictionaries.month.items.map((item) => {
                          return {
                            id: item.id,
                            name: item.name,
                          };
                        }),
                }}
                year={{
                  placeholder:
                    dictionaries.required.date_of_birth_dropdown
                      .year_placeholder,
                  items: getDateNumbers({
                    locale: locale,
                    start: parseInt(moment().format("YYYY")),
                    gap: 1,
                    length: 100,
                    type: "desc",
                  }),
                }}
                value={state.required_information.date_of_birth.value}
                onChange={handleChangeBirthDate}
              />

              <Dropdown
                label={dictionaries.required.race_dropdown.label}
                placeholder={dictionaries.required.race_dropdown.placeholder}
                items={appDictionaries.race.items.filter(
                  (item) => item.id !== "All Race"
                )}
                selected={state.required_information.race.value}
                onSelect={handleSelectRace}
              />

              <CheckboxGroup label={dictionaries.required.gender_input.label}>
                <div
                  className={clsx(
                    "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
                    "w-full"
                  )}
                >
                  {appDictionaries.gender.items
                    .filter((item) => item.id !== "All Gender")
                    .map((item, index) => (
                      <CheckboxButton
                        key={index}
                        checked={
                          state.required_information.gender.value?.id ===
                          item.id
                        }
                        label={item.name}
                        value={item.id}
                        onChange={() => handleSelectGender(item)}
                      />
                    ))}
                </div>
              </CheckboxGroup>

              <Phonefield
                textfield={{
                  label: dictionaries.required.phonenumber.label,
                  placeholder: dictionaries.required.phonenumber.placeholder,
                  maxLength: dictionaries.required.phonenumber.max_length,
                  value: state.required_information.phonenumber.value,
                  startHelper: phoneNumberErrorMessage,
                  variant: isPhonenumberError ? "error" : "standard",
                }}
                country_code={{
                  type: "modal",
                  title: dictionaries.required.phonenumber.country_code.title,
                  search: {
                    placeholder:
                      dictionaries.required.phonenumber.country_code
                        .placeholder,
                    errorMessage:
                      dictionaries.required.phonenumber.country_code.errors.find(
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
                value={state.required_information.phonenumber.value}
                onChange={handleChangePhonenumber}
              />
            </div>
          </div>

          <OTP
            type="bottom_sheet"
            otp={{
              open: state.required_information.otp.feature.is_open,
              title: dictionaries.required.otp_bottom_sheet.message,
              message: dictionaries.required.otp_bottom_sheet.description,
              description: state.required_information.phonenumber.value,
              error:
                state.required_information.otp.verified ||
                state.required_information.otp.verified === undefined
                  ? null
                  : {
                      message:
                        dictionaries.required.otp_bottom_sheet.error_message,
                    },
              cta: {
                primary: {
                  children: dictionaries.required.otp_bottom_sheet.send_otp,
                  onClick: handleSendOTP,
                },
              },

              onClose: handleCloseOTP,
              onSubmit: handleSubmitOTP,
            }}
          />

          {/* actions */}
          <div
            className={clsx(
              "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button
              variant={"outlined"}
              href={RouterFunctions.setBackURL({
                defaultURL: PrivateRouteURL.routeToStaffHomeURL({
                  locale: locale,
                }),
              })}
            >
              {dictionaries.required.actions.back.toUpperCase()}
            </Button>

            {!state.required_information.otp.verified && (
              <Button
                disabled={isPendingSendOTP || isOTPButtonDisabled}
                onClick={handleSendOTP}
              >
                {isPendingSendOTP && <MoonLoader />}
                {dictionaries.required.actions.send_otp.toUpperCase()}
              </Button>
            )}

            {state.required_information.otp.verified && (
              <Button onClick={handleClickNext}>
                {dictionaries.required.actions.next.toUpperCase()}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </AppContainer>
  );
};
