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
export interface EditOutletInitialStateType {
  form: EditOutletForm;
}

// State Collection Types consist of:

export interface EditOutletForm {
  id: undefined | number;
  photo_profile: {
    value: string;
  };

  fullname: {
    value: string;
    error: null | {
      code: string;
    };
  };

  address: {
    value: string;
  };

  phonenumber: {
    value: string;
  };

  confirmation_modal: {
    open: boolean;
  };
}

export enum EditOutletActionEnum {
  // Required Information
  SetFormID = "SetFormID",
  SetFormData = "SetFormData",
  ChangePhotoProfileValue = "ChangePhotoProfileValue",
  ChangeFullNameValue = "ChangeFullNameValue",
  OnBlurFullName = "OnBlurFullName",

  ChangeAddressValue = "ChangeAddressValue",
}

// Action Collection Types
export type EditOutletActions = EditOutletRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type EditOutletRequiredInformationPayload = {
  [EditOutletActionEnum.SetFormID]: number;
  [EditOutletActionEnum.SetFormData]: EditOutletForm;
  [EditOutletActionEnum.ChangePhotoProfileValue]: string;
  [EditOutletActionEnum.ChangeFullNameValue]: string;
  [EditOutletActionEnum.OnBlurFullName]: undefined;
  [EditOutletActionEnum.ChangeAddressValue]: string;
};

export type EditOutletRequiredInformationActions =
  ActionMap<EditOutletRequiredInformationPayload>[keyof ActionMap<EditOutletRequiredInformationPayload>];
