import { useContext } from "react";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";
import { StaffProfileActionEnum, StaffProfileContext } from "../../context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import {
  useStaffProfilePutUpdateStaffPersonal,
  useStaffProfilePutUpdateStaffPhoto,
} from "../../react_query/hooks";

export const ConfirmationStaffProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffProfileContext);

  const { mutate: updateStaffPhoto } = useStaffProfilePutUpdateStaffPhoto();
  const { mutate: updateStaffByPersonal } =
    useStaffProfilePutUpdateStaffPersonal();

  const handleClose = () => {
    dispatch({
      type: StaffProfileActionEnum.CloseConfirmationModal,
    });
  };

  const handleSubmit = () => {
    const isProfilePictureNotChanged =
      state.form.photo_profile.value.includes("https") ||
      !state.form.photo_profile.value.length;
    if (isProfilePictureNotChanged) {
      updateStaffByPersonal();
    } else {
      updateStaffPhoto();
    }
  };
  return (
    <ConfirmationModal
      open={state.form.confirmation_modal.open}
      onClose={handleClose}
      image_url={dictionaries.confirmation_dialog.image_url}
      cta={{
        primary: {
          children: dictionaries.confirmation_dialog.submit,
          onClick: handleSubmit,
        },
        secondary: {
          children: dictionaries.confirmation_dialog.check_again,
          onClick: handleClose,
        },
      }}
    />
  );
};
