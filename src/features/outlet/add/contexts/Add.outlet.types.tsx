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
export interface OutletAddInitialStateType {
  form: OutletAddForm;
}

// State Collection Types consist of:

export interface OutletAddForm {
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

export enum OutletAddActionEnum {
  SetFormData = "SetFormData",
  // Required Information
  ChangePhotoProfileValue = "ChangePhotoProfileValue",
  ChangeFullNameValue = "ChangeFullNameValue",

  ChangeAddressValue = "ChangeAddressValue",

  OpenConfirmationModal = "OpenConfirmationModal",
  CloseConfirmationModal = "CloseConfirmationModal",
}

// Action Collection Types
export type OutletAddActions = OutletAddRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type OutletAddRequiredInformationPayload = {
  [OutletAddActionEnum.SetFormData]: OutletAddForm;
  [OutletAddActionEnum.ChangePhotoProfileValue]: string;
  [OutletAddActionEnum.ChangeFullNameValue]: string;
  [OutletAddActionEnum.ChangeAddressValue]: string;
  [OutletAddActionEnum.OpenConfirmationModal]: undefined;
  [OutletAddActionEnum.CloseConfirmationModal]: undefined;
};

export type OutletAddRequiredInformationActions =
  ActionMap<OutletAddRequiredInformationPayload>[keyof ActionMap<OutletAddRequiredInformationPayload>];
