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
export interface ViewOutletInitialStateType {
  form: IViewOutletForm;
}

// State Collection Types consist of:

export interface IViewOutletForm {
  id: undefined | number;
  photo_profile: {
    value: string;
  };

  fullname: {
    value: string;
  };

  address: {
    value: string;
  };

  phonenumber: {
    value: string;
  };

  country_code: {
    value: string;
    feature: {
      is_open: boolean;
    };
  };

  confirmation_modal: {
    open: boolean;
  };
}

export enum ViewOutletActionEnum {
  // Required Information
  SetFormID = "SetFormID",
  SetFormData = "SetFormData",
}

// Action Collection Types
export type ViewOutletActions = ViewOutletRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type ViewOutletRequiredInformationPayload = {
  [ViewOutletActionEnum.SetFormID]: number;
  [ViewOutletActionEnum.SetFormData]: IViewOutletForm;
};

export type ViewOutletRequiredInformationActions =
  ActionMap<ViewOutletRequiredInformationPayload>[keyof ActionMap<ViewOutletRequiredInformationPayload>];
