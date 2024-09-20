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
export interface StaffEditInitialStateType {
  form: StaffEditForm;
}

// State Collection Types consist of:

export interface StaffEditForm {
  id: number | undefined;
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

export enum StaffEditActionEnum {
  // Required Information
  SetFormID = "SetFormID",
  SetFormData = "SetFormData",
  ChangePhotoProfileValue = "ChangePhotoProfileValue",

  OpenConfirmationModal = "OpenConfirmationModal",
  CloseConfirmationModal = "CloseConfirmationModal",
}

// Action Collection Types
export type StaffEditActions = StaffEditRequiredInformationActions;

// Action Collection Types consist of:

// Required Information
type StaffEditRequiredInformationPayload = {
  [StaffEditActionEnum.SetFormID]: number;
  [StaffEditActionEnum.SetFormData]: StaffEditForm;
  [StaffEditActionEnum.ChangePhotoProfileValue]: string;

  [StaffEditActionEnum.OpenConfirmationModal]: undefined;
  [StaffEditActionEnum.CloseConfirmationModal]: undefined;
};

export type StaffEditRequiredInformationActions =
  ActionMap<StaffEditRequiredInformationPayload>[keyof ActionMap<StaffEditRequiredInformationPayload>];
