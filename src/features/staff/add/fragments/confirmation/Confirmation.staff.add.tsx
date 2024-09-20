import { useContext } from "react";

import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";
import { StaffAddContext, StaffAddActionEnum } from "../../contexts";
import { useStaffAddPostCreateStaff } from "../../react_query/hooks";

export const ConfirmationStaffAdd = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffAddContext);

  const { mutate: createStaff } = useStaffAddPostCreateStaff();

  const handleClose = () => {
    dispatch({
      type: StaffAddActionEnum.SetFormData,
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
    createStaff();
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
