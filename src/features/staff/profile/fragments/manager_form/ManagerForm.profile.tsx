import { useContext } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { StaffProfileContext } from "../../context/Profile.staff.context";
import { StaffProfileActionEnum } from "../../context/Profile.staff.types";
import {
  useStaffProfileGetOutlet,
  useStaffProfileGetOutlets,
  useStaffProfileGetStaff,
} from "../../react_query/hooks";
import { PhotoUploaderStaffProfile } from "../../components/photo_uploader";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Phonefield } from "src/core/ui/components/phonefield";
import SVGIcon from "src/core/ui/icons";
import { PasswordField } from "src/core/ui/components/passwordfield";
import { Textfield } from "src/core/ui/components/textfield";
import { RegexFunctions } from "src/core/utils/validations";
import { RadioGroup } from "src/core/ui/components/radio_group";
import { RadioButton } from "src/core/ui/components/radio_button";
import { Autocomplete } from "src/core/ui/components/autocomplete";

export const ManagerFormStaffProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state, dispatch } = useContext(StaffProfileContext);
  useStaffProfileGetOutlet();
  useStaffProfileGetOutlets();
  useStaffProfileGetStaff();

  // const { mutate: logout } = useStaffProfileRemoveUser();
  // const { state: authState } = useContext(AuthContext);
  // const { mutate: updateStaffPhoto } = useStaffProfilePutUpdateStaffPhoto();
  // const { mutate: updateStaffByPersonal } =
  //   useStaffProfilePutUpdateStaffPersonal();

  const handleUploadPhotoProfile = (data: string) => {
    dispatch({
      type: StaffProfileActionEnum.ChangePhotoProfileValue,
      payload: data,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: StaffProfileActionEnum.SetFormData,
      payload: {
        ...state.form,
        fullname: {
          ...state.form.fullname,
          value: e.currentTarget.value,
        },
      },
    });
  };
  const handleBlurName = () => {
    const value = state.form.fullname.value;
    dispatch({
      type: StaffProfileActionEnum.SetFormData,
      payload: {
        ...state.form,
        fullname: {
          ...state.form.fullname,
          value: value.trim(),
        },
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: StaffProfileActionEnum.SetFormData,
      payload: {
        ...state.form,
        password: {
          ...state.form.password,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleChangePhonenumber = (data: string) => {
    dispatch({
      type: StaffProfileActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: data,
        },
      },
    });
  };

  // const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch({
  //     type: StaffProfileActionEnum.OpenConfirmationModal,
  //   });
  // };

  // const handleCloseConfirmationDialog = () => {
  //   dispatch({
  //     type: StaffProfileActionEnum.CloseConfirmationModal,
  //   });
  // };

  // const handleSubmitConfirmationDialog = () => {
  //   const isProfilePictureNotChanged =
  //     state.form.photo_profile.value.includes("https") ||
  //     !state.form.photo_profile.value.length;
  //   if (isProfilePictureNotChanged) {
  //     updateStaffByPersonal();
  //   } else {
  //     updateStaffPhoto();
  //   }
  // };

  // const handleCloseReloginDialog = () => {
  //   logout();
  // };

  // const handleSubmitReloginDialog = () => {
  //   logout();
  // };

  const isAnyFullnameCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.fullname.schemas,
    value: state.form.fullname.value,
  });

  const isAnyPasswordCriteriaError = RegexFunctions.checkAnySchemaIsInvalid({
    items: appDictionaries.validations.password.schemas,
    value: state.form.password.value,
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
      <PhotoUploaderStaffProfile
        photo={state.form.photo_profile.value}
        disabled={!state.form.edit}
        onUpload={handleUploadPhotoProfile}
        cta={{
          primary: {
            children: dictionaries.upload_staff_photo.browse,
          },
        }}
        editor={{
          title: dictionaries.crop_profile_photo_modal.message,
          cta: {
            primary: {
              children: dictionaries.crop_profile_photo_modal.save,
            },
            secondary: {
              children: dictionaries.crop_profile_photo_modal.cancel,
            },
          },
        }}
      />
      <Textfield
        label={
          !state.form.edit
            ? dictionaries.staff_name_input.label.replace("*", "")
            : dictionaries.staff_name_input.label
        }
        placeholder={dictionaries.staff_name_input.placeholder}
        value={state.form.fullname.value}
        maxLength={64}
        startHelper={
          !state.form.fullname.value.length
            ? ""
            : isAnyFullnameCriteriaError
            ? appDictionaries.validations.fullname.schemas.find(
                (item) => item.id === "valid_fullname"
              )?.name ?? ""
            : ""
        }
        disabled={!state.form.edit}
        variant={
          !state.form.fullname.value.length
            ? "standard"
            : isAnyFullnameCriteriaError
            ? "error"
            : "standard"
        }
        onBlur={handleBlurName}
        onChange={handleChangeName}
      />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.25rem]"
        )}
      >
        <PasswordField
          label={
            !state.form.edit
              ? dictionaries.staff_password_input.label.replace("*", "")
              : dictionaries.staff_password_input.label
          }
          placeholder={dictionaries.staff_password_input.placeholder}
          value={state.form.password.value}
          maxLength={255}
          onChange={handleChangePassword}
          disabled={!state.form.edit}
          variant={
            !state.form.password.value.length
              ? "standard"
              : isAnyPasswordCriteriaError
              ? "error"
              : "standard"
          }
        />

        {state.form.edit && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.5rem]"
            )}
          >
            {appDictionaries.validations.password.schemas.map((item, index) => {
              const regex = new RegExp(item.regex);
              const isError = !regex.test(state.form.password.value);

              return (
                <div
                  key={index}
                  className={clsx(
                    "grid grid-flow-col justify-items-start justify-start items-center content-center w-full gap-x-[0.5rem]"
                  )}
                >
                  <SVGIcon
                    name="ExclamationCircle"
                    className={clsx(
                      "w-[0.875rem] h-[0.875rem]",
                      !state.form.password.value.length
                        ? "fill-white-60"
                        : !isError
                        ? "fill-philippine-green"
                        : "fill-deep-dumpling"
                    )}
                  />
                  <p
                    className={clsx(
                      "text-[0.75rem] font-normal",
                      !state.form.password.value.length
                        ? "text-white-60"
                        : !isError
                        ? "text-philippine-green"
                        : "text-deep-dumpling"
                    )}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Phonefield
        textfield={{
          label: !state.form.edit
            ? dictionaries.phonenumber.label.replace("*", "")
            : dictionaries.phonenumber.label,
          placeholder: dictionaries.phonenumber.placeholder,
          maxLength: dictionaries.phonenumber.max_length,
          value: state.form.phonenumber.value,
          startHelper: phoneNumberErrorMessage,
          variant: isPhonenumberError ? "error" : "standard",
          disabled: !state.form.edit,
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
      <RadioGroup label={dictionaries.staff_permission_input.label}>
        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {appDictionaries.permission.staffs.items
            .filter((item) => item.id !== "All Permissions")
            .map((item, index) => (
              <RadioButton
                key={index}
                label={item.name}
                disabled={true}
                checked={item.id === state.form.permission.selected?.id}
              />
            ))}
        </div>
      </RadioGroup>

      <Autocomplete
        label={dictionaries.staff_outlet_input.label}
        placeholder={dictionaries.staff_outlet_input.placeholder}
        selected={state.form.outlets.selected}
        disabled
      />

      <Textfield
        label={dictionaries.staff_position_input.label}
        placeholder={
          !state.form.position.value.length
            ? dictionaries.staff_position_input.empty_placeholder
            : dictionaries.staff_position_input.placeholder
        }
        value={state.form.position.value}
        disabled
      />

      {/* <ConfirmationDialogProfile
        open={state.form.confirmation_modal.open}
        onClose={handleCloseConfirmationDialog}
        onSubmit={handleSubmitConfirmationDialog}
      /> */}

      {/* <ReloginDialogProfile
        open={state.form.relogin_modal.open}
        onClose={handleCloseReloginDialog}
        onSubmit={handleSubmitReloginDialog}
      /> */}
    </div>
  );
};
