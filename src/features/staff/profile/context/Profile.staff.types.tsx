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
export interface StaffProfileInitialStateType {
  form: IStaffProfileForm;
}

// State Collection Types consist of:

export interface IStaffProfileForm {
  id: number | undefined;
  edit: boolean;
  photo_profile: {
    initial: string;
    value: string;
  };

  fullname: {
    value: string;
  };

  password: {
    value: string;
  };
  permission: {
    selected: null | { id: string; name: string };
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

  relogin_modal: {
    open: boolean;
  };
}

export enum StaffProfileActionEnum {
  // Required Information
  SetFormID = "SetFormID",
  SetEditMode = "SetEditMode",
  SetViewMode = "SetViewMode",
  SetFormData = "SetFormData",
  ChangePhotoProfileValue = "ChangePhotoProfileValue",

  OpenConfirmationModal = "OpenConfirmationModal",
  CloseConfirmationModal = "CloseConfirmationModal",
  OpenReloginModal = "OpenReloginModal",
  CloseReloginModal = "CloseReloginModal",
}

// Action Collection Types
export type StaffProfileActions = StaffProfileRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type StaffProfileRequiredInformationPayload = {
  [StaffProfileActionEnum.SetFormID]: number;
  [StaffProfileActionEnum.SetEditMode]: undefined;
  [StaffProfileActionEnum.SetViewMode]: undefined;
  [StaffProfileActionEnum.SetFormData]: IStaffProfileForm;
  [StaffProfileActionEnum.ChangePhotoProfileValue]: string;

  [StaffProfileActionEnum.OpenConfirmationModal]: undefined;
  [StaffProfileActionEnum.CloseConfirmationModal]: undefined;

  [StaffProfileActionEnum.OpenReloginModal]: undefined;
  [StaffProfileActionEnum.CloseReloginModal]: undefined;
};

export type StaffProfileRequiredInformationActions =
  ActionMap<StaffProfileRequiredInformationPayload>[keyof ActionMap<StaffProfileRequiredInformationPayload>];
