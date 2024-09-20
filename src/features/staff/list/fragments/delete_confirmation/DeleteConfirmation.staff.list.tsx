import { useContext } from "react";
import { ConfirmationModal } from "src/core/ui/components/confirmation_modal";

import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { StaffListContext } from "../../contexts/StaffList.context";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { useDisplayDeleteStaff } from "../../react_query/hooks/useDeleteStaff.list";

export const DeleteConfirmationStaffList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffListContext);
  const { mutate: deleteStaff } = useDisplayDeleteStaff();

  const selectedOutletName =
    state.data.selected.id > 0 && state.data.list.length > 0
      ? state.data.list.filter((item) => item.id === state.data.selected.id)[0]
          ?.name
      : "";
  const handleClose = () => {
    dispatch({
      type: StaffListActionEnum.CloseDeleteConfirmationDialog,
    });
  };

  const handleCancelDelete = () => {
    dispatch({
      type: StaffListActionEnum.CloseDeleteConfirmationDialog,
    });
  };

  const handleSubmitDelete = () => {
    deleteStaff();
  };

  return (
    <ConfirmationModal
      open={state.data.delete_confirmation_dialog.open}
      message={`${dictionaries.staff_delete_dialog.message} ${selectedOutletName}`}
      description={dictionaries.staff_delete_dialog.description}
      image_url={dictionaries.staff_delete_dialog.image_url}
      cta={{
        primary: {
          children: dictionaries.staff_delete_dialog.delete,
          onClick: handleSubmitDelete,
        },
        secondary: {
          children: dictionaries.staff_delete_dialog.cancel,
          onClick: handleCancelDelete,
        },
      }}
      onClose={handleClose}
    />
  );
};
