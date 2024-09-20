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
export interface CustomerRegistrationInitialStateType {
  global: CustomerRegistrationGlobal;
  required_information: CustomerRegistrationRequiredInformation;
  additional_information: CustomerRegistrationAdditionalInformation;
  questionnaire: CustomerRegistrationQuestionnaire;
  agreement: CustomerRegistrationAgreement;
}

// State Collection Types consist of:
export interface CustomerRegistrationGlobal {
  state: string;

  profile_picture: {
    value: string;
    new_value: string;
  };
}

export interface CustomerRegistrationRequiredInformation {
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
}

export interface CustomerRegistrationAdditionalInformation {
  email: {
    value: string;
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

  marital_status: {
    value: null | {
      id: string;
      name: string;
    };
  };

  address: {
    value: string;
  };
}

export interface CustomerRegistrationQuestionnaire {
  gender: undefined | string;
  window: {
    active: number;
    limit: number;
  };
  answers: {
    [key: number]: undefined | string[];
  };
}

export interface CustomerRegistrationAgreement {
  questionnaire: {
    answers: {
      [key: number]: string[] | undefined;
    };
  };
}

export enum CustomerRegistrationActionEnum {
  // state
  SetGlobal = "SetGlobal",

  ChangeStateToAdditionalInformation = "ChangeStateToAdditionalInformation",
  ClickTakeProfilePictureRequiredInformation = "ClickTakeProfilePictureRequiredInformation",
  ClickBackAdditional = "ClickBackAdditional",
  ClickNextAdditional = "ClickNextAdditional",
  ClickBackQuestionnaire = "ClickBackQuestionnaire",
  ClickNextQuestionnaire = "ClickNextQuestionnaire",
  ClickBackAgreement = "ClickBackAgreement",
  ChangeProfilePictureValue = "ChangeProfilePictureValue",
  ClickRetakeProfilePicturePreview = "ClickRetakeProfilePicturePreview",
  ClickYesProfilePicturePreview = "ClickYesProfilePicturePreview",
  ClickBackProfilePicture = "ClickBackProfilePicture",
  ClickTakeAPictureProfilePicture = "ClickTakeAPictureProfilePicture",

  // Required Information
  SetRequiredInformationData = "SetRequiredInformationData",
  ChangeFullNameValue = "ChangeFullNameValue",
  OnBlurFullName = "OnBlurFullName",
  ChangeRaceValue = "ChangeRaceValue",
  ChangeGenderValue = "ChangeGenderValue",

  // Additional Information
  SetAdditionalInformationData = "SetAdditionalInformationData",

  // Questionnaire
  SetQuestionnaireGender = "SetQuestionnaireGender",
  SetWindowActiveToNext = "SetWindowActiveToNext",
  SetWindowActiveToPrevious = "SetWindowActiveToPrevious",
  SetQuestionnaireAnswers = "SetQuestionnaireAnswers",

  // Agreement
  SetAgreementAnswers = "SetAgreementAnswers",
}

// Action Collection Types
export type CustomerRegistrationActions =
  | CustomerRegistrationGlobalActions
  | CustomerRegistrationRequiredInformationActions
  | CustomerRegistrationAdditionalInformationActions
  | CustomerRegistrationQuestionnaireActions
  | CustomerRegistrationAgreementActions;

// Action Collection Types consist of:
// Global
type CustomerRegistrationGlobalPayload = {
  [CustomerRegistrationActionEnum.SetGlobal]: CustomerRegistrationGlobal;

  [CustomerRegistrationActionEnum.ChangeStateToAdditionalInformation]: undefined;
  [CustomerRegistrationActionEnum.ClickTakeProfilePictureRequiredInformation]: undefined;
  [CustomerRegistrationActionEnum.ClickBackAdditional]: undefined;
  [CustomerRegistrationActionEnum.ClickNextAdditional]: undefined;
  [CustomerRegistrationActionEnum.ClickBackQuestionnaire]: undefined;
  [CustomerRegistrationActionEnum.ClickNextQuestionnaire]: undefined;
  [CustomerRegistrationActionEnum.ClickBackAgreement]: undefined;
  [CustomerRegistrationActionEnum.ClickRetakeProfilePicturePreview]: undefined;
  [CustomerRegistrationActionEnum.ClickYesProfilePicturePreview]: undefined;
  [CustomerRegistrationActionEnum.ClickBackProfilePicture]: undefined;
  [CustomerRegistrationActionEnum.ClickTakeAPictureProfilePicture]: undefined;
  [CustomerRegistrationActionEnum.ChangeProfilePictureValue]: string;
  [CustomerRegistrationActionEnum.ChangeProfilePictureValue]: string;
};
export type CustomerRegistrationGlobalActions =
  ActionMap<CustomerRegistrationGlobalPayload>[keyof ActionMap<CustomerRegistrationGlobalPayload>];

// Required Information
type CustomerRegistrationRequiredInformationPayload = {
  [CustomerRegistrationActionEnum.SetRequiredInformationData]: CustomerRegistrationRequiredInformation;
  [CustomerRegistrationActionEnum.ChangeFullNameValue]: string;
  [CustomerRegistrationActionEnum.OnBlurFullName]: undefined;
  [CustomerRegistrationActionEnum.ChangeRaceValue]: string;
  [CustomerRegistrationActionEnum.ChangeGenderValue]: string;
};

export type CustomerRegistrationRequiredInformationActions =
  ActionMap<CustomerRegistrationRequiredInformationPayload>[keyof ActionMap<CustomerRegistrationRequiredInformationPayload>];

// Additional Information
type CustomerRegistrationAdditionalInformationPayload = {
  [CustomerRegistrationActionEnum.SetAdditionalInformationData]: CustomerRegistrationAdditionalInformation;
};
export type CustomerRegistrationAdditionalInformationActions =
  ActionMap<CustomerRegistrationAdditionalInformationPayload>[keyof ActionMap<CustomerRegistrationAdditionalInformationPayload>];

// Questionnaire
type CustomerRegistrationQuestionnairePayload = {
  [CustomerRegistrationActionEnum.SetQuestionnaireGender]: string | undefined;
  [CustomerRegistrationActionEnum.SetWindowActiveToPrevious]: undefined;
  [CustomerRegistrationActionEnum.SetWindowActiveToNext]: undefined;
  [CustomerRegistrationActionEnum.SetQuestionnaireAnswers]: {
    [key: number]: undefined | string[];
  };
};
export type CustomerRegistrationQuestionnaireActions =
  ActionMap<CustomerRegistrationQuestionnairePayload>[keyof ActionMap<CustomerRegistrationQuestionnairePayload>];

// Agreement
type CustomerRegistrationAgreementPayload = {
  [CustomerRegistrationActionEnum.SetAgreementAnswers]: {
    [key: number]: undefined | string[];
  };
};
export type CustomerRegistrationAgreementActions =
  ActionMap<CustomerRegistrationAgreementPayload>[keyof ActionMap<CustomerRegistrationAgreementPayload>];
