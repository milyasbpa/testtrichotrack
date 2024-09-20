import {
  StaffEditForm,
  StaffEditActionEnum,
  StaffEditActions,
} from "./Edit.staff.types";

// form
export const StaffEditFormReducer = (
  state: StaffEditForm,
  action: StaffEditActions
) => {
  switch (action.type) {
    case StaffEditActionEnum.SetFormID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case StaffEditActionEnum.SetFormData: {
      return action.payload;
    }
    case StaffEditActionEnum.ChangePhotoProfileValue: {
      return {
        ...state,
        photo_profile: {
          ...state.photo_profile,
          value: action.payload,
        },
      };
    }

    case StaffEditActionEnum.OpenConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: true,
        },
      };
    }
    case StaffEditActionEnum.CloseConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: false,
        },
      };
    }

    default:
      return state;
  }
};
