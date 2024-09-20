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
export interface StaffAddInitialStateType {
  form: StaffAddForm;
}

// State Collection Types consist of:

export interface StaffAddForm {
  photo_profile: {
    value: string;
  };

  fullname: {
    value: string;
  };
  password: {
    value: string;
  };
  permission: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
  outlets: {
    selected: {
      id: string;
      name: string;
    } | null;
    query: string;
    data: { id: string; name: string }[];
  };

  position: {
    value: string;
  };

  phonenumber: {
    value: string;
  };

  confirmation_modal: {
    open: boolean;
  };
}

export enum StaffAddActionEnum {
  SetFormData = "SetFormData",

  ChangePhotoProfileValue = "ChangePhotoProfileValue",
  ChangeFullNameValue = "ChangeFullNameValue",
  OnBlurFullName = "OnBlurFullName",
  ChangePasswordValue = "ChangePasswordValue",
  ChangePermissionValue = "ChangePermissionValue",
  SetOutletsData = "SetOutletsData",
  SelectOutlet = "SelectOutlet",
  ChangePositionValue = "ChangePositionValue",
  OpenConfirmationModal = "OpenConfirmationModal",
  CloseConfirmationModal = "CloseConfirmationModal",
}

// Action Collection Types
export type StaffAddActions = StaffAddRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type StaffAddRequiredInformationPayload = {
  [StaffAddActionEnum.SetFormData]: StaffAddForm;
  [StaffAddActionEnum.ChangePhotoProfileValue]: string;

  [StaffAddActionEnum.OpenConfirmationModal]: undefined;
  [StaffAddActionEnum.CloseConfirmationModal]: undefined;
};

export type StaffAddRequiredInformationActions =
  ActionMap<StaffAddRequiredInformationPayload>[keyof ActionMap<StaffAddRequiredInformationPayload>];
