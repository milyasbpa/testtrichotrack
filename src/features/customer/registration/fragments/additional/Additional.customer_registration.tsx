import React, { useContext } from "react";
import clsx from "clsx";
import {
  CustomerRegistrationActionEnum,
  CustomerRegistrationContext,
} from "../../context";
import { Stepper } from "src/core/ui/components/stepper";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Textfield } from "src/core/ui/components/textfield";
import { Dropdown } from "src/core/ui/components/dropdown";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Textarea } from "src/core/ui/components/textarea";
import { RadioGroup } from "src/core/ui/components/radio_group";
import { RadioButton } from "src/core/ui/components/radio_button";
import { Card } from "src/core/ui/components/card/Card";
import SVGIcon from "src/core/ui/icons";

export const AdditionalCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state, dispatch } = useContext(CustomerRegistrationContext);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        email: {
          ...state.additional_information.email,
          value: e.currentTarget.value,
        },
      },
    });
  };
  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        email: {
          ...state.additional_information.email,
          value: e.currentTarget.value.trim(),
        },
      },
    });
  };

  const handleChangeProfession = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        profession: {
          ...state.additional_information.profession,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleSelectCitizenship = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        citizenship: {
          ...state.additional_information.citizenship,
          value: data,
        },
      },
    });
  };

  const handleChangeMaritalStatus = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        marital_status: {
          ...state.additional_information.marital_status,
          value: data,
        },
      },
    });
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: CustomerRegistrationActionEnum.SetAdditionalInformationData,
      payload: {
        ...state.additional_information,
        address: {
          ...state.additional_information.address,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleClickSkip = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickNextAdditional,
    });
  };

  const handleClickBack = () => {
    dispatch({
      type: CustomerRegistrationActionEnum.ClickBackAdditional,
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
          <Stepper selected={1} items={dictionaries.step.items} />
          <h2 className={clsx("text-[2rem] text-white font-bold text-left")}>
            {dictionaries.additional.title}
          </h2>

          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 gap-y-[2rem] justify-start justify-items-start",
                "w-full"
              )}
            >
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
                label={dictionaries.additional.email_address.label}
                value={state.additional_information.email.value}
                placeholder={dictionaries.additional.email_address.placeholder}
                // startHelper={emailAddressErrorMessage}
                // errorValidation={
                //   !state.additional_information.email_address_input.validate
                // }
                onChange={handleChangeEmail}
                onBlur={handleBlurEmail}
              />

              <Textfield
                label={dictionaries.additional.profession.label}
                placeholder={dictionaries.additional.profession.placeholder}
                value={state.additional_information.profession.value}
                onChange={handleChangeProfession}
              />

              <Dropdown
                label={dictionaries.additional.citizenship.label}
                placeholder={dictionaries.additional.citizenship.placeholder}
                items={appDictionaries.citizenship.items}
                selected={state.additional_information.citizenship.value}
                onSelect={handleSelectCitizenship}
              />

              <RadioGroup label={dictionaries.additional.marital_status.label}>
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
                        item.id ===
                        state.additional_information.marital_status.value?.id
                      }
                      onChange={() => handleChangeMaritalStatus(item)}
                    />
                  ))}
                </div>
              </RadioGroup>

              <Textarea
                label={dictionaries.additional.address.label}
                placeholder={dictionaries.additional.address.placeholder}
                value={state.additional_information.address.value}
                onChange={handleChangeAddress}
              />
            </div>
          </div>

          {/* actions */}
          <div
            className={clsx(
              "flex justify-between gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.additional.actions.back.toUpperCase()}
            </Button>

            <Button onClick={handleClickSkip}>
              {dictionaries.additional.actions.next.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>
    </AppContainer>
  );
};
