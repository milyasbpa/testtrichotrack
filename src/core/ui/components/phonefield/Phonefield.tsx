import { useState } from "react";
import { Button } from "../button";
import { Textfield, TextfieldProps } from "../textfield";
import clsx from "clsx";
import {
  CountryCodeBottomSheet,
  CountryCodeBottomSheetItemsProps,
  CountryCodeBottomSheetProps,
} from "../country_code_bottom_sheet";
import { CountryCodeModal, CountryCodeModalProps } from "../country_code_modal";

// NOTES: input must follow this format +${country_code}${phonenumber}
export interface PhonefieldProps {
  textfield?: TextfieldProps;
  country_code?:
    | ({ type: "modal" | "bottom_sheet" } & CountryCodeBottomSheetProps &
        CountryCodeModalProps)
    | null;
  value?: string;
  onChange?: (data: string) => void;
}

export const Phonefield = ({
  textfield,
  country_code,
  value = "",
  onChange = () => {},
}: PhonefieldProps) => {
  const [isOpenCountryCode, setIsOpenCountryCode] = useState<boolean>(false);
  const countryCodeValue = value.length < 3 ? "" : String(value).slice(0, 3);

  const textfieldValue = value.length < 3 ? "" : String(value).slice(3);

  const selectedCountryCode = !country_code?.items
    ? null
    : country_code?.items.find((item) => item.id === countryCodeValue) ?? null;

  const handleClickCountryCode = () => {
    setIsOpenCountryCode(true);
  };

  const handleSelectCountryCode = (data: CountryCodeBottomSheetItemsProps) => {
    setIsOpenCountryCode(false);
    onChange(`${data.id}${textfieldValue}`);
  };

  const handleCloseCountryCode = () => {
    setIsOpenCountryCode(false);
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${countryCodeValue}${e.currentTarget.value}`);
  };
  return (
    <>
      <Textfield
        {...textfield}
        value={textfieldValue}
        startAddornment={
          <Button
            className={clsx("!rounded-[0.5rem]")}
            variant="contained"
            disabled={!!textfield?.disabled}
            onClick={handleClickCountryCode}
          >
            {!!selectedCountryCode && (
              <div
                className={clsx("grid grid-cols-[auto_auto] gap-x-[0.5rem]")}
              >
                <img src={selectedCountryCode.image_url} />
                <p
                  className={clsx(
                    "text-[white] text-[1rem] font-semibold text-center"
                  )}
                >
                  {selectedCountryCode.id}
                </p>
              </div>
            )}
          </Button>
        }
        type="tel"
        onChange={handleChangePhonenumber}
      />
      {!!country_code && (
        <>
          {country_code.type === "bottom_sheet" ? (
            <CountryCodeBottomSheet
              {...country_code}
              open={isOpenCountryCode}
              onClose={handleCloseCountryCode}
              onSelect={handleSelectCountryCode}
            />
          ) : (
            <CountryCodeModal
              {...country_code}
              open={isOpenCountryCode}
              onClose={handleCloseCountryCode}
              onSelect={handleSelectCountryCode}
            />
          )}
        </>
      )}
    </>
  );
};
