import { useContext } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import {
  CustomerProfileActionEnum,
  CustomerProfileContext,
} from "../../contexts";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useCustomerProfilePostVerifyMobile } from "../../react_query/hooks/usePostVerifyMobile.customer_profile";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { RegexFunctions } from "src/core/utils/validations";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { Card } from "src/core/ui/components/card/Card";
import { AvatarProfilePicture } from "src/core/ui/components/avatar_profile_picture";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { Textfield } from "src/core/ui/components/textfield";
import { BirthdateDropdown } from "src/core/ui/components/birthdate_dropdown";
import { getDateNumbers } from "src/core/utils/generator";
import moment from "moment";
import { Dropdown } from "src/core/ui/components/dropdown";
import { CheckboxGroup } from "src/core/ui/components/checkbox_group";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import { Phonefield } from "src/core/ui/components/phonefield";
import SVGIcon from "src/core/ui/icons";
import { RadioGroup } from "src/core/ui/components/radio_group";
import { RadioButton } from "src/core/ui/components/radio_button";
import { Textarea } from "src/core/ui/components/textarea";
import { Checkbox } from "src/core/ui/components/checkbox";
import { OTP } from "src/core/ui/components/otp";

export const FormCustomerProfile = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { mutate: sendOTP, isPending: isPendingSendOTP } =
    useCustomerProfilePostVerifyMobile();
  const { state, dispatch } = useContext(CustomerProfileContext);

  const handleClickRetake = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickTakeProfilePictureRequiredInformation,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        fullname: {
          ...state.personal_data.fullname,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleBlurFullname = () => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        fullname: {
          ...state.personal_data.fullname,
          value: state.personal_data.fullname.value.trim(),
        },
      },
    });
  };

  const handleSelectRace = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        race: {
          ...state.personal_data.race,
          value: data,
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        gender: {
          ...state.personal_data.gender,
          value: data,
        },
      },
    });
  };

  const handleChangeBirthDate = (data: string) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        date_of_birth: {
          ...state.personal_data.date_of_birth,
          value: data,
        },
      },
    });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        email: {
          ...state.personal_data.email,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        email: {
          ...state.personal_data.email,
          value: e.currentTarget.value.trim(),
        },
      },
    });
  };

  const handleChangeProfession = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        profession: {
          ...state.personal_data.profession,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleSelectCitizenship = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        citizenship: {
          ...state.personal_data.citizenship,
          value: data,
        },
      },
    });
  };

  const handleChangeMaritalStatus = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        marital_status: {
          ...state.personal_data.marital_status,
          value: data,
        },
      },
    });
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        address: {
          ...state.personal_data.address,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        phonenumber: {
          ...state.personal_data.phonenumber,
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
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        otp: {
          ...state.personal_data.otp,
          value: "",
          verified: undefined,
          feature: {
            ...state.personal_data.otp.feature,
            is_open: false,
          },
        },
      },
    });
  };

  const handleClickSave = () => {
    dispatch({
      type: CustomerProfileActionEnum.ClickSavePersonalData,
    });
  };

  const handleSubmitOTP = (data: string) => {
    dispatch({
      type: CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue,
      payload: {
        ...state.personal_data,
        otp: {
          ...state.personal_data.otp,
          verified: data === state.personal_data.otp.value,
        },
      },
    });
  };

  const handleClickBack = () => {
    navigate(PrivateRouteURL.routeToCustomerHomeURL({ locale: locale }));
  };

  const handleClickAgreeWithMarketingPromotion = () => {
    dispatch({
      type: CustomerProfileActionEnum.ChangeMarketingPromotionValue,
    });
  };

  const isAnyFullnameCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.fullname.schemas,
    value: state.personal_data.fullname.value,
  });

  const countryCodeValue = state.personal_data.phonenumber.value.slice(0, 3);
  const selectedPhonenumberItem =
    appDictionaries.phone_number.items.find(
      (item) => item.id === countryCodeValue
    ) ?? null;
  const selectedPhonenumberRegex = !selectedPhonenumberItem
    ? null
    : new RegExp(selectedPhonenumberItem.regex);
  const isPhonenumberError = !state.personal_data.phonenumber.value.slice(3)
    .length
    ? false
    : !selectedPhonenumberRegex
    ? false
    : !selectedPhonenumberRegex.test(state.personal_data.phonenumber.value);
  const phoneNumberErrorMessage = isPhonenumberError
    ? dictionaries.edit_profile.phonenumber.errors.find(
        (item) => item.id === "INVALID_PHONE_NUMBER"
      )?.name ?? ""
    : "";

  const isOTPButtonDisabled =
    isAnyFullnameCriteriaError ||
    isPhonenumberError ||
    state.personal_data.phonenumber.value.length <= 3;

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <h2 className={clsx("text-[2rem] text-white font-bold text-center")}>
            {dictionaries.edit_profile.title}
          </h2>

          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-center place-items-center",
                  "w-full"
                )}
              >
                <AvatarProfilePicture
                  label={dictionaries.edit_profile.avatar_profile.change.toUpperCase()}
                  image={{
                    picture_url: !state.global.profile_picture.value.length
                      ? dictionaries.edit_profile.avatar_profile.image
                          .default_url
                      : state.global.profile_picture.value,
                    banner_url:
                      dictionaries.edit_profile.avatar_profile.image.banner_url,
                  }}
                  onClick={handleClickRetake}
                />
              </div>
              <Textfield
                label={dictionaries.edit_profile.fullname_input.label}
                placeholder={
                  dictionaries.edit_profile.fullname_input.placeholder
                }
                value={state.personal_data.fullname.value}
                startHelper={
                  !state.personal_data.fullname.value.length
                    ? ""
                    : isAnyFullnameCriteriaError
                    ? appDictionaries.validations.fullname.schemas.find(
                        (item) => item.id === "valid_fullname"
                      )?.name ?? ""
                    : ""
                }
                variant={
                  !state.personal_data.fullname.value.length
                    ? "standard"
                    : isAnyFullnameCriteriaError
                    ? "error"
                    : "standard"
                }
                onBlur={handleBlurFullname}
                onChange={handleChangeName}
              />

              <BirthdateDropdown
                label={dictionaries.edit_profile.date_of_birth_dropdown.label}
                date={{
                  placeholder:
                    dictionaries.edit_profile.date_of_birth_dropdown
                      .date_placeholder,
                  items: getDateNumbers({
                    locale: locale,
                    start: 1,
                    gap: 1,
                    length:
                      moment(state.personal_data.date_of_birth.value).year() ===
                        moment().year() &&
                      moment(
                        state.personal_data.date_of_birth.value
                      ).month() === moment().month()
                        ? parseInt(moment().format("DD"))
                        : moment(
                            state.personal_data.date_of_birth.value
                          ).daysInMonth(),
                    type: "asc",
                  }),
                }}
                month={{
                  placeholder:
                    dictionaries.edit_profile.date_of_birth_dropdown
                      .month_placeholder,
                  items:
                    moment(state.personal_data.date_of_birth.value).year() ===
                    moment().year()
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
                    dictionaries.edit_profile.date_of_birth_dropdown
                      .year_placeholder,
                  items: getDateNumbers({
                    locale: locale,
                    start: parseInt(moment().format("YYYY")),
                    gap: 1,
                    length: 100,
                    type: "desc",
                  }),
                }}
                value={state.personal_data.date_of_birth.value}
                onChange={handleChangeBirthDate}
              />

              <Dropdown
                label={dictionaries.edit_profile.race_dropdown.label}
                placeholder={
                  dictionaries.edit_profile.race_dropdown.placeholder
                }
                items={appDictionaries.race.items.filter(
                  (item) => item.id !== "All Race"
                )}
                selected={state.personal_data.race.value}
                onSelect={handleSelectRace}
              />

              <CheckboxGroup
                label={dictionaries.edit_profile.gender_input.label}
              >
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
                          state.personal_data.gender.value?.id === item.id
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
                  label: dictionaries.edit_profile.phonenumber.label,
                  placeholder:
                    dictionaries.edit_profile.phonenumber.placeholder,
                  maxLength: dictionaries.edit_profile.phonenumber.max_length,
                  value: state.personal_data.phonenumber.value,
                  startHelper: phoneNumberErrorMessage,
                  variant: isPhonenumberError ? "error" : "standard",
                }}
                country_code={{
                  type: "modal",
                  title:
                    dictionaries.edit_profile.phonenumber.country_code.title,
                  search: {
                    placeholder:
                      dictionaries.edit_profile.phonenumber.country_code
                        .placeholder,
                    errorMessage:
                      dictionaries.edit_profile.phonenumber.country_code.errors.find(
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
                value={state.personal_data.phonenumber.value}
                onChange={handleChangePhonenumber}
              />

              <Textfield
                startAddornment={
                  <SVGIcon
                    name="Email"
                    className={clsx(
                      "w-[1.25rem] h-[1.25rem]",
                      "fill-[#999999]"
                    )}
                  />
                }
                label={dictionaries.edit_profile.email_address.label}
                value={state.personal_data.email.value}
                placeholder={
                  dictionaries.edit_profile.email_address.placeholder
                }
                // startHelper={emailAddressErrorMessage}
                // errorValidation={
                //   !state.additional_information.email_address_input.validate
                // }
                onChange={handleChangeEmail}
                onBlur={handleBlurEmail}
              />

              <Textfield
                label={dictionaries.edit_profile.profession.label}
                placeholder={dictionaries.edit_profile.profession.placeholder}
                value={state.personal_data.profession.value}
                onChange={handleChangeProfession}
              />

              <Dropdown
                label={dictionaries.edit_profile.citizenship.label}
                placeholder={dictionaries.edit_profile.citizenship.placeholder}
                items={appDictionaries.citizenship.items}
                selected={state.personal_data.citizenship.value}
                onSelect={handleSelectCitizenship}
              />

              <RadioGroup
                label={dictionaries.edit_profile.marital_status.label}
              >
                <div
                  className={clsx(
                    "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
                    "w-full"
                  )}
                >
                  {appDictionaries.marital_status.items.map((item, index) => (
                    <RadioButton
                      key={index}
                      label={item.name}
                      checked={
                        item.id === state.personal_data.marital_status.value?.id
                      }
                      onChange={() => handleChangeMaritalStatus(item)}
                    />
                  ))}
                </div>
              </RadioGroup>

              <Textarea
                label={dictionaries.edit_profile.address.label}
                placeholder={dictionaries.edit_profile.address.placeholder}
                value={state.personal_data.address.value}
                onChange={handleChangeAddress}
              />

              <div
                className={clsx(
                  "flex items-start justify-start gap-x-[00.5rem]"
                )}
              >
                <Checkbox
                  checked={state.personal_data.marketing_promotion.value}
                  onChange={() => handleClickAgreeWithMarketingPromotion}
                />

                <p
                  className={clsx(
                    "text-[1.125rem] text-white font-bold text-left"
                  )}
                >
                  {dictionaries.marketing_promotion.statement}
                  <span
                    className={clsx(
                      "text-[1.125rem] text-white-57 font-normal text-left"
                    )}
                  >
                    {dictionaries.marketing_promotion.optional}
                  </span>
                </p>
              </div>
            </div>
          </VerticalFlexGrow>
          {/* different layer */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.edit_profile.actions.back.toUpperCase()}
            </Button>

            {!state.personal_data.otp.verified && (
              <Button
                disabled={isPendingSendOTP || isOTPButtonDisabled}
                onClick={handleSendOTP}
              >
                {dictionaries.edit_profile.actions.send_otp.toUpperCase()}
              </Button>
            )}
            {state.personal_data.otp.verified && (
              <Button
                // disabled={state.personal_data.save_button.disabled}
                onClick={handleClickSave}
              >
                {dictionaries.edit_profile.actions.save.toUpperCase()}
              </Button>
            )}
          </div>
        </VerticalFlexContainer>
      </Card>
      <OTP
        type="bottom_sheet"
        otp={{
          open: state.personal_data.otp.feature.is_open,
          title: dictionaries.edit_profile.otp_bottom_sheet.message,
          message: dictionaries.edit_profile.otp_bottom_sheet.description,
          description: state.personal_data.phonenumber.value,
          error:
            state.personal_data.otp.verified ||
            state.personal_data.otp.verified === undefined
              ? null
              : {
                  message:
                    dictionaries.edit_profile.otp_bottom_sheet.error_message,
                },
          cta: {
            primary: {
              children: dictionaries.edit_profile.otp_bottom_sheet.send_otp,
              onClick: handleSendOTP,
            },
          },

          onClose: handleCloseOTP,
          onSubmit: handleSubmitOTP,
        }}
      />
    </AppContainer>
  );
};
