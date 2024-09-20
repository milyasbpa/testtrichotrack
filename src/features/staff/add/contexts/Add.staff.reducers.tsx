import {
  StaffAddForm,
  StaffAddActionEnum,
  StaffAddActions,
} from "./Add.staff.types";

// form
export const StaffAddFormReducer = (
  state: StaffAddForm,
  action: StaffAddActions
) => {
  switch (action.type) {
    case StaffAddActionEnum.SetFormData: {
      return action.payload;
    }
    case StaffAddActionEnum.ChangePhotoProfileValue: {
      return {
        ...state,
        photo_profile: {
          ...state.photo_profile,
          value: action.payload,
        },
      };
    }

    case StaffAddActionEnum.OpenConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: true,
        },
      };
    }
    case StaffAddActionEnum.CloseConfirmationModal: {
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
