import { REGEX } from "../formatters";

export const PhonenumberValidation = {
  IsValid: (data: { country_code: string; number: string }) => {
    const countryCode = data.country_code;
    const phoneNumber = data.number;
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const isValid =
      countryCode === "+62"
        ? REGEX.indonesia_phone_number.test(fullPhoneNumber)
        : countryCode === "+65"
        ? REGEX.singapore_phone_number.test(fullPhoneNumber)
        : countryCode === "+86"
        ? REGEX.china_phone_number.test(fullPhoneNumber)
        : countryCode === "+91"
        ? REGEX.india_phone_number.test(fullPhoneNumber)
        : countryCode === "+1"
        ? REGEX.united_states_phone_number.test(fullPhoneNumber)
        : countryCode === "+61"
        ? REGEX.australia_phone_number.test(fullPhoneNumber)
        : REGEX.malaysia_phone_number.test(fullPhoneNumber);
    return isValid;
  },
};
