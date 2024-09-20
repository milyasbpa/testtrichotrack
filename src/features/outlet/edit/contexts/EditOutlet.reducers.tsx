import {
  EditOutletForm,
  EditOutletActionEnum,
  EditOutletActions,
} from "./EditOutlet.types";

// form
export const EditOutletFormReducer = (
  state: EditOutletForm,
  action: EditOutletActions
) => {
  switch (action.type) {
    case EditOutletActionEnum.SetFormID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case EditOutletActionEnum.SetFormData: {
      return action.payload;
    }
    case EditOutletActionEnum.ChangePhotoProfileValue: {
      return {
        ...state,
        photo_profile: {
          ...state.photo_profile,
          value: action.payload,
        },
      };
    }
    case EditOutletActionEnum.ChangeFullNameValue: {
      return {
        ...state,
        fullname: {
          ...state.fullname,
          value: action.payload,
        },
      };
    }

    case EditOutletActionEnum.OnBlurFullName: {
      return {
        ...state,
        fullname: {
          ...state.fullname,
          value: state.fullname.value.trim(),
        },
      };
    }

    case EditOutletActionEnum.ChangeAddressValue: {
      return {
        ...state,
        address: {
          ...state.address,
          value: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
