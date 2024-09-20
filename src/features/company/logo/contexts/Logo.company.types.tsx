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
export interface CompanyLogoInitialStateType {
  uploader: CompanyLogoUploader;
  notifications: CompanyLogoNotifications;
}

// State Collection Types consist of:
export interface CompanyLogoUploader {
  image: string;
  isValid: boolean;
}

export interface CompanyLogoNotifications {
  modal: {
    open: boolean;
  };
}

export enum CompanyLogoActionEnum {
  // uploader
  SetUploaderData = "SetUploaderData",
  SetImageUploader = "SetImageUploader",
  ValidateImage = "ValidateImage",
  // notification
  SetNotificationsData = "SetNotificationsData",
  SetModalData = "SetModalData",
}

// Action Collection Types
export type CompanyLogoActions =
  | CompanyLogoUploaderActions
  | CompanyLogoNotificationsActions;

// Action Collection Types consist of:
// uploader
type CompanyLogoUploaderPayload = {
  [CompanyLogoActionEnum.SetUploaderData]: CompanyLogoUploader;
  [CompanyLogoActionEnum.SetImageUploader]: string;
  [CompanyLogoActionEnum.ValidateImage]: boolean;
};

export type CompanyLogoUploaderActions =
  ActionMap<CompanyLogoUploaderPayload>[keyof ActionMap<CompanyLogoUploaderPayload>];

// notifications
type CompanyLogoNotificationsPayload = {
  [CompanyLogoActionEnum.SetNotificationsData]: CompanyLogoNotifications;

  [CompanyLogoActionEnum.SetModalData]: {
    open: boolean;
  };
};

export type CompanyLogoNotificationsActions =
  ActionMap<CompanyLogoNotificationsPayload>[keyof ActionMap<CompanyLogoNotificationsPayload>];
