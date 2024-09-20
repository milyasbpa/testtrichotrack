import {
  CustomerQuestionnaire,
  CustomerQuestionnaireGlobal,
  CustomerQuestionnaireActionEnum,
  CustomerQuestionnaireActions,
} from "./Questionnaire.customer.types";

// Global
export const CustomerQuestionnaireGlobalReducer = (
  state: CustomerQuestionnaireGlobal,
  action: CustomerQuestionnaireActions
) => {
  switch (action.type) {
    case CustomerQuestionnaireActionEnum.SetGlobalValue: {
      return action.payload;
    }

    case CustomerQuestionnaireActionEnum.ClickSaveQuestionnaire: {
      return {
        ...state,
        state: "update-confirmation",
      };
    }
    case CustomerQuestionnaireActionEnum.ClickBackUpdateConfirmation: {
      return {
        ...state,
        state: "questionnaire",
      };
    }

    default:
      return state;
  }
};

// Questionnaire
export const CustomerQuestionnaireReducer = (
  state: CustomerQuestionnaire,
  action: CustomerQuestionnaireActions
) => {
  switch (action.type) {
    case CustomerQuestionnaireActionEnum.SetQuestionnaireValue: {
      return action.payload;
    }
    case CustomerQuestionnaireActionEnum.SetQuestionnaireID: {
      return {
        ...state,
        id: action.payload,
      };
    }
    case CustomerQuestionnaireActionEnum.SetQuestionnaireGender: {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case CustomerQuestionnaireActionEnum.SetWindowActiveToNext: {
      return {
        ...state,
        window: {
          ...state.window,
          active: state.window.active + 1,
        },
      };
    }
    case CustomerQuestionnaireActionEnum.SetWindowActiveToPrevious: {
      return {
        ...state,
        window: {
          ...state.window,
          active: state.window.active - 1,
        },
      };
    }
    case CustomerQuestionnaireActionEnum.SetQuestionnaireAnswers: {
      return {
        ...state,
        answers: { ...state.answers, ...action.payload },
      };
    }
    default:
      return state;
  }
};
