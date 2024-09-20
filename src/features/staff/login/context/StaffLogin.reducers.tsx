import {
  StaffLoginForm,
  StaffLoginActionEnum,
  StaffLoginActions,
} from "./StaffLogin.types";

// Form
export const StaffLoginFormReducer = (
  state: StaffLoginForm,
  action: StaffLoginActions
) => {
  switch (action.type) {
    case StaffLoginActionEnum.SetFormData: {
      return action.payload;
    }

    default:
      return state;
  }
};
