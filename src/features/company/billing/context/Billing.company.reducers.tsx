import {
  CompanyBillingActionEnum,
  CompanyBillingActions,
  CompanyBillingProfile,
} from "./Billing.company.types";

// Profile
export const CompanyBillingProfileReducer = (
  state: CompanyBillingProfile,
  action: CompanyBillingActions
) => {
  switch (action.type) {
    case CompanyBillingActionEnum.SetProfileData:
      return action.payload;

    default:
      return state;
  }
};
