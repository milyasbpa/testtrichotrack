import { useContext } from "react";

import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";
import { StaffEditContext, StaffEditActionEnum } from "../../contexts";
import { useStaffEditPutUpdateStaffPhoto } from "../../react_query/hooks/usePutUpdateStaffPhoto.staff.edit";
import { useStaffEditPutUpdateStaffAdministrative } from "../../react_query/hooks/usePutUpdateStaffAdministrative.staff.edit";

export const ConfirmationStaffEdit = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state, dispatch } = useContext(StaffEditContext);

  const { mutate: updateStaffPhoto } = useStaffEditPutUpdateStaffPhoto();

  const { mutate: updateStaffByAdmin } =
    useStaffEditPutUpdateStaffAdministrative();

  const handleClose = () => {
    dispatch({
      type: StaffEditActionEnum.SetFormData,
      payload: {
        ...state.form,
        confirmation_modal: {
          ...state.form.confirmation_modal,
          open: false,
        },
      },
    });
  };

  const handleSubmit = () => {
    const isProfilePictureNotChanged =
      state.form.photo_profile.value.includes("https") ||
      !state.form.photo_profile.value.length;
    if (isProfilePictureNotChanged) {
      updateStaffByAdmin();
    } else {
      updateStaffPhoto();
    }
  };
  return (
    <ConfirmationModal
      open={state.form.confirmation_modal.open}
      onClose={handleClose}
      message={dictionaries.confirmation.message}
      description={dictionaries.confirmation.description}
      image_url={dictionaries.confirmation.image_url}
      cta={{
        primary: {
          children: dictionaries.confirmation.cta.primary.children,
          onClick: handleSubmit,
        },
        secondary: {
          children: dictionaries.confirmation.cta.secondary.children,
          onClick: handleClose,
        },
      }}
    />
  );
};
