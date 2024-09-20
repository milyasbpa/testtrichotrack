import {
  IStaffProfileForm,
  StaffProfileActionEnum,
  StaffProfileActions,
} from "./Profile.staff.types";

// form
export const StaffProfileFormReducer = (
  state: IStaffProfileForm,
  action: StaffProfileActions
) => {
  switch (action.type) {
    case StaffProfileActionEnum.SetFormData: {
      return action.payload;
    }
    case StaffProfileActionEnum.SetFormID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case StaffProfileActionEnum.SetEditMode: {
      return {
        ...state,
        edit: true,
      };
    }
    case StaffProfileActionEnum.SetViewMode: {
      return {
        ...state,
        edit: false,
      };
    }

    case StaffProfileActionEnum.ChangePhotoProfileValue: {
      return {
        ...state,
        photo_profile: {
          ...state.photo_profile,
          value: action.payload,
        },
      };
    }

    case StaffProfileActionEnum.OpenConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: true,
        },
      };
    }
    case StaffProfileActionEnum.CloseConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: false,
        },
      };
    }

    case StaffProfileActionEnum.OpenReloginModal: {
      return {
        ...state,
        relogin_modal: {
          ...state.relogin_modal,
          open: true,
        },
      };
    }
    case StaffProfileActionEnum.CloseReloginModal: {
      return {
        ...state,
        relogin_modal: {
          ...state.relogin_modal,
          open: false,
        },
      };
    }

    default:
      return state;
  }
};
