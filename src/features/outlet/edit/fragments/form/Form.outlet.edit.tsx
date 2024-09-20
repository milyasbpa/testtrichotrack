import { useContext } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { EditOutletContext } from "../../contexts/EditOutlet.context";
import { PhotoUploaderOutletEdit } from "../../components/photo_uploader/PhotoUploader.outlet.edit";
import { EditOutletActionEnum } from "../../contexts/EditOutlet.types";
import { useOutletEditGetOutlet } from "../../react_query/hooks/useGetOutlet.edit";
import { getDictionaries } from "../../i18n";
import { Textfield } from "src/core/ui/components/textfield";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { REGEX } from "src/core/utils/formatters";
import { Textarea } from "src/core/ui/components/textarea";
import { Phonefield } from "src/core/ui/components/phonefield";

export const FormOutletEdit = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  useOutletEditGetOutlet();

  const { state, dispatch } = useContext(EditOutletContext);

  const handleUploadPhotoProfile = (data: string) => {
    dispatch({
      type: EditOutletActionEnum.ChangePhotoProfileValue,
      payload: data,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid =
      !REGEX.trailing_slash.test(e.currentTarget.value) &&
      e.currentTarget.value.length > 0;

    dispatch({
      type: EditOutletActionEnum.SetFormData,
      payload: {
        ...state.form,
        fullname: {
          ...state.form.fullname,
          value: e.currentTarget.value,
          error: isValid
            ? null
            : {
                code: "OUTLET_ADD_FULLNAME",
              },
        },
      },
    });
  };

  const handleBlurName = () => {
    const value = state.form.fullname.value;
    const isValid =
      value.length > 0 && !REGEX.trailing_slash.test(value.trim());
    dispatch({
      type: EditOutletActionEnum.SetFormData,
      payload: {
        ...state.form,
        fullname: {
          ...state.form.fullname,
          value: value.trim(),
          error: isValid
            ? null
            : {
                code: "OUTLET_ADD_FULLNAME",
              },
        },
      },
    });
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: EditOutletActionEnum.ChangeAddressValue,
      payload: e.currentTarget.value,
    });
  };

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: EditOutletActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: data,
        },
      },
    });
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
    ? dictionaries.phonenumber.errors.find(
        (item) => item.id === "INVALID_PHONE_NUMBER"
      )?.name ?? ""
    : "";

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
      )}
    >
      <PhotoUploaderOutletEdit
        label={dictionaries.upload_outlet_photo.label}
        placeholder={dictionaries.upload_outlet_photo.optional}
        cta={{
          primary: {
            children: dictionaries.upload_outlet_photo.browse,
          },
        }}
        editor={{
          title: dictionaries.crop_outlet_photo_modal.message,
          cta: {
            primary: {
              children: dictionaries.crop_outlet_photo_modal.save,
            },
            secondary: {
              children: dictionaries.crop_outlet_photo_modal.cancel,
            },
          },
        }}
        photo={state.form.photo_profile.value}
        onUpload={handleUploadPhotoProfile}
      />
      <Textfield
        label={dictionaries.outlet_name_input.label}
        placeholder={dictionaries.outlet_name_input.placeholder}
        value={state.form.fullname.value}
        maxLength={64}
        startHelper={
          !state.form.fullname.error
            ? ""
            : dictionaries.outlet_name_input.error_message
        }
        variant={!!state.form.fullname.error ? "error" : "standard"}
        onBlur={handleBlurName}
        onChange={handleChangeName}
      />

      <Textarea
        label={dictionaries.outlet_address_input.label}
        placeholder={dictionaries.outlet_address_input.placeholder}
        value={state.form.address.value}
        onChange={handleChangeAddress}
        startHelper={dictionaries.outlet_address_input.start_helper_text}
      />

      <Phonefield
        textfield={{
          label: dictionaries.phonenumber.label,
          placeholder: dictionaries.phonenumber.placeholder,
          maxLength: dictionaries.phonenumber.max_length,
          value: state.form.phonenumber.value,
          startHelper: phoneNumberErrorMessage,
          variant: isPhonenumberError ? "error" : "standard",
        }}
        country_code={{
          type: "modal",
          title: dictionaries.phonenumber.country_code.title,
          search: {
            placeholder: dictionaries.phonenumber.country_code.placeholder,
            errorMessage:
              dictionaries.phonenumber.country_code.errors.find(
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
    </div>
  );
};
