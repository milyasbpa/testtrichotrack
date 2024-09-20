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
export interface StaffLoginInitialStateType {
  form: StaffLoginForm;
}

// State Collection Types consist of:

export interface StaffLoginForm {
  phonenumber: {
    value: string;
  };
  password: {
    value: string;
  };
}

export enum StaffLoginActionEnum {
  // form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type StaffLoginActions = StaffLoginFormActions;

// Action Collection Types consist of:

// Form
type StaffLoginFormPayload = {
  [StaffLoginActionEnum.SetFormData]: StaffLoginForm;
};

export type StaffLoginFormActions =
  ActionMap<StaffLoginFormPayload>[keyof ActionMap<StaffLoginFormPayload>];
