type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface CompanyBillingInitialStateType {
  profile: CompanyBillingProfile;
}

// State Collection Types consist of:
export interface CompanyBillingProfile {
  alert: null | { [key: string]: string };
  tier_name: {
    [key: string]: string;
  };
  type: "credit" | "subscription" | null;
  expired_date: string;
  day_remaining: null | number;
  credit: number | null;
  outlet: {
    number: null | number;
    limit: null | number;
  };
  staff: {
    number: null | number;
    limit: null | number;
  };
  customers: {
    number: null | number;
    limit: null | number;
  };
}

export enum CompanyBillingActionEnum {
  // profile
  SetProfileData = "SetProfileData",
}

// Action Collection Types
export type CompanyBillingActions = CompanyBillingProfileActions;

// Action Collection Types consist of:
// profile
type CompanyBillingProfilePayload = {
  [CompanyBillingActionEnum.SetProfileData]: CompanyBillingProfile;
};

export type CompanyBillingProfileActions =
  ActionMap<CompanyBillingProfilePayload>[keyof ActionMap<CompanyBillingProfilePayload>];
