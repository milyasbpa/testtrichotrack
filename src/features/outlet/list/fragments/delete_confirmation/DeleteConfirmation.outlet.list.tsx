import { useContext } from "react";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";
import { OutletListActionEnum, OutletListContext } from "../../contexts";
import { useDisplayDeleteOutlet } from "../../react_query/hooks";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const DeleteConfirmationOutletList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(OutletListContext);
  const { mutate: deleteOutlet } = useDisplayDeleteOutlet();

  const selectedOutletName =
    state.data.selected.id > 0 && state.data.list.length > 0
      ? state.data.list.filter((item) => item.id === state.data.selected.id)[0]
          ?.name
      : "";
  const handleClose = () => {
    dispatch({
      type: OutletListActionEnum.CloseDeleteConfirmationDialog,
    });
  };

  const handleCancelDelete = () => {
    dispatch({
      type: OutletListActionEnum.CloseDeleteConfirmationDialog,
    });
  };

  const handleSubmitDelete = () => {
    deleteOutlet();
  };

  return (
    <ConfirmationModal
      open={state.data.delete_confirmation_dialog.open}
      message={`${dictionaries.outlet_delete_dialog.message} ${selectedOutletName}`}
      description={dictionaries.outlet_delete_dialog.description}
      image_url={dictionaries.outlet_delete_dialog.image_url}
      cta={{
        primary: {
          children: dictionaries.outlet_delete_dialog.delete,
          onClick: handleSubmitDelete,
        },
        secondary: {
          children: dictionaries.outlet_delete_dialog.cancel,
          onClick: handleCancelDelete,
        },
      }}
      onClose={handleClose}
    />
  );
};
