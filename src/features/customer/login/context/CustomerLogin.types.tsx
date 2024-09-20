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
export interface CustomerLoginInitialStateType {
  form: ICustomerLoginForm;
}

// State Collection Types consist of:

export interface ICustomerLoginForm {
  phonenumber: {
    value: string;
  };

  otp: {
    verified: boolean | undefined;
    feature: {
      is_open: boolean;
    };
  };
}

export enum CustomerLoginActionEnum {
  // form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type CustomerLoginActions = CustomerLoginPhonenumberActions;

// Action Collection Types consist of:

// Phone Number
type CustomerLoginPhonenumberPayload = {
  [CustomerLoginActionEnum.SetFormData]: ICustomerLoginForm;
};

export type CustomerLoginPhonenumberActions =
  ActionMap<CustomerLoginPhonenumberPayload>[keyof ActionMap<CustomerLoginPhonenumberPayload>];
