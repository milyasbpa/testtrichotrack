import {
  OutletAddForm,
  OutletAddActionEnum,
  OutletAddActions,
} from "./Add.outlet.types";

// form
export const OutletAddFormReducer = (
  state: OutletAddForm,
  action: OutletAddActions
) => {
  switch (action.type) {
    case OutletAddActionEnum.SetFormData: {
      return action.payload;
    }
    case OutletAddActionEnum.ChangePhotoProfileValue: {
      return {
        ...state,
        photo_profile: {
          ...state.photo_profile,
          value: action.payload,
        },
      };
    }
    case OutletAddActionEnum.ChangeFullNameValue: {
      return {
        ...state,
        fullname_input: {
          ...state.fullname,
          value: action.payload,
        },
      };
    }

    case OutletAddActionEnum.ChangeAddressValue: {
      return {
        ...state,
        address: {
          ...state.address,
          value: action.payload,
        },
      };
    }

    case OutletAddActionEnum.OpenConfirmationModal: {
      return {
        ...state,
        confirmation_modal: {
          ...state.confirmation_modal,
          open: true,
        },
      };
    }
    case OutletAddActionEnum.CloseConfirmationModal: {
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
