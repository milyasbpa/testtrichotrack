import {
  ICustomerLoginForm,
  CustomerLoginActionEnum,
  CustomerLoginActions,
} from "./CustomerLogin.types";

// SetPhoneNumber
export const CustomerLoginPhonenumberReducer = (
  state: ICustomerLoginForm,
  action: CustomerLoginActions
) => {
  switch (action.type) {
    case CustomerLoginActionEnum.SetFormData: {
      return action.payload;
    }

    default:
      return state;
  }
};
