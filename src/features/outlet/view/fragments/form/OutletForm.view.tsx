import { useContext } from "react";
import clsx from "clsx";
import { ViewOutletContext } from "../../context/ViewOutlet.context";
import { UploadOutletPhotoView } from "../../components/upload_outlet_photo/UploadOutletPhoto.view";
import { useViewGetOutlet } from "../../react_query/hooks/useGetOutlet.view";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Textfield } from "src/core/ui/components/textfield";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Textarea } from "src/core/ui/components/textarea";
import { Phonefield } from "src/core/ui/components/phonefield";

export const FormOutletView = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  useViewGetOutlet();
  const { state } = useContext(ViewOutletContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem] w-full"
      )}
    >
      <UploadOutletPhotoView
        label={dictionaries.upload_outlet_photo.label}
        photo={state.form.photo_profile.value}
      />

      <Textfield
        label={dictionaries.outlet_name_input.label}
        placeholder={dictionaries.outlet_name_input.placeholder}
        value={state.form.fullname.value}
        maxLength={64}
        disabled
        variant={"standard"}
      />

      <Textarea
        label={dictionaries.outlet_address_input.label}
        placeholder={dictionaries.outlet_address_input.placeholder}
        value={state.form.address.value}
        disabled
      />

      <Phonefield
        textfield={{
          label: dictionaries.phonenumber.label,
          placeholder: dictionaries.phonenumber.placeholder,
          maxLength: dictionaries.phonenumber.max_length,
          value: state.form.phonenumber.value,
          disabled: true,
          variant: "standard",
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
      />
    </div>
  );
};
