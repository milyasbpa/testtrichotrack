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
export interface CustomerProfileInitialStateType {
  global: CustomerProfileGlobal;
  personal_data: CustomerProfilePersonalData;
}

// State Collection Types consist of:
export interface CustomerProfileGlobal {
  profile_picture: {
    value: string;
    new_value: string;
  };
  state: string;
}

export interface CustomerProfilePersonalData {
  fullname: {
    value: string;
  };

  date_of_birth: {
    value: string;
  };

  race: {
    value: null | { id: string; name: string };
  };

  gender: {
    value: null | {
      id: string;
      name: string;
    };
  };

  email: {
    value: string;
  };

  phonenumber: {
    value: string;
  };

  otp: {
    value: string;
    verified: boolean | undefined;
    feature: {
      is_open: boolean;
    };
  };

  profession: {
    value: string;
  };
  citizenship: {
    value: null | {
      id: string;
      name: string;
    };
  };
  nric: {
    value: string;
  };

  marital_status: {
    value: null | {
      id: string;
      name: string;
    };
  };

  address: {
    value: string;
  };

  marketing_promotion: {
    value: boolean;
  };
}

export enum CustomerProfileActionEnum {
  // global
  SetGlobal = "SetGlobal",
  ChangeStateToAdditionalInformation = "ChangeStateToAdditionalInformation",
  ClickTakeProfilePictureRequiredInformation = "ClickTakeProfilePictureRequiredInformation",
  ClickSavePersonalData = "ClickSavePersonalData",
  ChangeProfilePictureValue = "ChangeProfilePictureValue",
  ClickRetakeProfilePicturePreview = "ClickRetakeProfilePicturePreview",
  ClickYesProfilePicturePreview = "ClickYesProfilePicturePreview",
  ClickBackProfilePicture = "ClickBackProfilePicture",
  ClickTakeAPictureProfilePicture = "ClickTakeAPictureProfilePicture",
  ClickNoConfirmation = "ClickNoConfirmation",

  SetCustomerProfilePersonalDataValue = "SetCustomerProfilePersonalDataValue",

  // Marketing Promotion
  ChangeMarketingPromotionValue = "ChangeMarketingPromotionValue",
}

// Action Collection Types
export type CustomerProfileActions =
  | CustomerProfileGlobalActions
  | CustomerProfilePersonalDataActions;

// Action Collection Types consist of:
// Global
type CustomerProfileGlobalPayload = {
  [CustomerProfileActionEnum.SetGlobal]: CustomerProfileGlobal;
  [CustomerProfileActionEnum.ChangeStateToAdditionalInformation]: undefined;
  [CustomerProfileActionEnum.ClickSavePersonalData]: undefined;
  [CustomerProfileActionEnum.ClickTakeProfilePictureRequiredInformation]: undefined;
  [CustomerProfileActionEnum.ClickRetakeProfilePicturePreview]: undefined;
  [CustomerProfileActionEnum.ClickYesProfilePicturePreview]: undefined;
  [CustomerProfileActionEnum.ClickBackProfilePicture]: undefined;
  [CustomerProfileActionEnum.ClickTakeAPictureProfilePicture]: undefined;
  [CustomerProfileActionEnum.ChangeProfilePictureValue]: string;

  [CustomerProfileActionEnum.ClickNoConfirmation]: undefined;
};

export type CustomerProfileGlobalActions =
  ActionMap<CustomerProfileGlobalPayload>[keyof ActionMap<CustomerProfileGlobalPayload>];

// Personal Data
type CustomerProfilePersonalDataPayload = {
  // required information
  [CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue]: CustomerProfilePersonalData;

  // Marketing Promotion
  [CustomerProfileActionEnum.ChangeMarketingPromotionValue]: undefined;
};

export type CustomerProfilePersonalDataActions =
  ActionMap<CustomerProfilePersonalDataPayload>[keyof ActionMap<CustomerProfilePersonalDataPayload>];
