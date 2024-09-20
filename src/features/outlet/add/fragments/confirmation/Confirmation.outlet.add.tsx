import { useContext } from "react";

import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";
import { OutletAddActionEnum, OutletAddContext } from "../../contexts";
import { useAddOutletPostCreateOutlet } from "../../react_query/hooks";

export const ConfirmationOutletAdd = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(OutletAddContext);
  const { mutate: createOutlet } = useAddOutletPostCreateOutlet();

  const handleClose = () => {
    dispatch({
      type: OutletAddActionEnum.CloseConfirmationModal,
    });
  };

  const handleSubmit = () => {
    createOutlet();
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
