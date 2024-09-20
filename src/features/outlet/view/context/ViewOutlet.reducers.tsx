import {
  IViewOutletForm,
  ViewOutletActionEnum,
  ViewOutletActions,
} from "./ViewOutlet.types";

// form
export const ViewOutletFormReducer = (
  state: IViewOutletForm,
  action: ViewOutletActions
) => {
  switch (action.type) {
    case ViewOutletActionEnum.SetFormID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case ViewOutletActionEnum.SetFormData: {
      return action.payload;
    }

    default:
      return state;
  }
};
