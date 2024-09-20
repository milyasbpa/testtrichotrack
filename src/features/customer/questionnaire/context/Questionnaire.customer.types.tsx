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
export interface CustomerQuestionnaireInitialStateType {
  global: CustomerQuestionnaireGlobal;
  questionnaire: CustomerQuestionnaire;
}

// State Collection Types consist of:
export interface CustomerQuestionnaireGlobal {
  state: string;
}

export interface CustomerQuestionnaire {
  id: number | undefined;
  gender: string | undefined;
  window: {
    active: number;
    limit: number;
  };
  answers: {
    [key: number]: undefined | string[];
  };
}

export enum CustomerQuestionnaireActionEnum {
  // Global
  SetGlobalValue = "SetGlobalValue",

  ChangeQuestionnaire = "ChangeQuestionnaire",
  ClickSaveQuestionnaire = "ClCkSaveQuestionnaire",
  ClickBackUpdateConfirmation = "ClCkBackUpdateConfirmation",

  // Questionnaire
  SetQuestionnaireID = "SetQuestionnaireID",
  SetQuestionnaireGender = "SetQuestionnaireGender",
  SetQuestionnaireValue = "SetQuestionnaireValue",
  SetWindowActiveToNext = "SetWindowActiveToNext",
  SetWindowActiveToPrevious = "SetWindowActiveToPrevious",
  SetQuestionnaireAnswers = "SetQuestionnaireAnswers",
}

// Action Collection Types
export type CustomerQuestionnaireActions =
  | CustomerQuestionnaireGlobalActions
  | CustomerQuestionnaireFormActions;

// Action Collection Types consist of:
// Global
type CustomerQuestionnaireGlobalPayload = {
  [CustomerQuestionnaireActionEnum.SetGlobalValue]: CustomerQuestionnaireGlobal;

  [CustomerQuestionnaireActionEnum.ChangeQuestionnaire]: string;
  [CustomerQuestionnaireActionEnum.ClickSaveQuestionnaire]: undefined;
  [CustomerQuestionnaireActionEnum.ClickBackUpdateConfirmation]: undefined;
};

export type CustomerQuestionnaireGlobalActions =
  ActionMap<CustomerQuestionnaireGlobalPayload>[keyof ActionMap<CustomerQuestionnaireGlobalPayload>];

// Questionnaire
type CustomerQuestionnaireFormPayload = {
  [CustomerQuestionnaireActionEnum.SetQuestionnaireValue]: CustomerQuestionnaire;
  [CustomerQuestionnaireActionEnum.SetQuestionnaireID]: number | undefined;
  [CustomerQuestionnaireActionEnum.SetQuestionnaireGender]: string;
  [CustomerQuestionnaireActionEnum.SetWindowActiveToPrevious]: undefined;
  [CustomerQuestionnaireActionEnum.SetWindowActiveToNext]: undefined;
  [CustomerQuestionnaireActionEnum.SetQuestionnaireAnswers]: {
    [key: number]: undefined | string[];
  };
};

export type CustomerQuestionnaireFormActions =
  ActionMap<CustomerQuestionnaireFormPayload>[keyof ActionMap<CustomerQuestionnaireFormPayload>];
