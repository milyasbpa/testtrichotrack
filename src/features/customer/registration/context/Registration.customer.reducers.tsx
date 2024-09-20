import {
  CustomerRegistrationAdditionalInformation,
  CustomerRegistrationAgreement,
  CustomerRegistrationGlobal,
  CustomerRegistrationQuestionnaire,
  CustomerRegistrationRequiredInformation,
  CustomerRegistrationActionEnum,
  CustomerRegistrationActions,
} from "./Registration.customer.types";

// Global
export const CustomerRegistrationGlobalReducer = (
  state: CustomerRegistrationGlobal,
  action: CustomerRegistrationActions
) => {
  switch (action.type) {
    case CustomerRegistrationActionEnum.SetGlobal:
      return action.payload;

    case CustomerRegistrationActionEnum.ChangeStateToAdditionalInformation:
      return {
        ...state,
        state: "additional",
      };
    case CustomerRegistrationActionEnum.ClickTakeProfilePictureRequiredInformation: {
      return {
        ...state,
        state: "profile-picture",
      };
    }
    case CustomerRegistrationActionEnum.ClickBackAdditional:
      return {
        ...state,
        state: "required",
      };
    case CustomerRegistrationActionEnum.ClickNextAdditional:
      return {
        ...state,
        state: "questionnaire",
      };
    case CustomerRegistrationActionEnum.ClickBackQuestionnaire:
      return {
        ...state,
        state: "additional",
      };
    case CustomerRegistrationActionEnum.ClickNextQuestionnaire:
      return {
        ...state,
        state: "agreement",
      };
    case CustomerRegistrationActionEnum.ClickBackAgreement:
      return {
        ...state,
        state: "questionnaire",
      };
    case CustomerRegistrationActionEnum.ClickRetakeProfilePicturePreview:
      return {
        ...state,
        state: "profile-picture",
      };
    case CustomerRegistrationActionEnum.ClickYesProfilePicturePreview:
      return {
        ...state,
        state: "required",
        profile_picture: {
          ...state.profile_picture,
          value: state.profile_picture.new_value,
          new_value: "",
        },
      };
    case CustomerRegistrationActionEnum.ClickBackProfilePicture:
      return {
        ...state,
        state: "required",
      };
    case CustomerRegistrationActionEnum.ClickTakeAPictureProfilePicture:
      return {
        ...state,
        state: "profile-picture-preview",
      };
    case CustomerRegistrationActionEnum.ChangeProfilePictureValue:
      return {
        ...state,
        profile_picture: {
          ...state.profile_picture,
          new_value: action.payload,
        },
        state: "profile-picture-preview",
      };

    default:
      return state;
  }
};

// Required Information
export const CustomerRegistrationRequiredInformationReducer = (
  state: CustomerRegistrationRequiredInformation,
  action: CustomerRegistrationActions
) => {
  switch (action.type) {
    case CustomerRegistrationActionEnum.SetRequiredInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Additional Information
export const CustomerRegistrationAdditionalInformationReducer = (
  state: CustomerRegistrationAdditionalInformation,
  action: CustomerRegistrationActions
) => {
  switch (action.type) {
    case CustomerRegistrationActionEnum.SetAdditionalInformationData: {
      return action.payload;
    }

    default:
      return state;
  }
};

// Questionnaire
export const CustomerRegistrationQuestionnaireReducer = (
  state: CustomerRegistrationQuestionnaire,
  action: CustomerRegistrationActions
) => {
  switch (action.type) {
    case CustomerRegistrationActionEnum.SetQuestionnaireGender: {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case CustomerRegistrationActionEnum.SetWindowActiveToNext: {
      return {
        ...state,
        window: {
          ...state.window,
          active: state.window.active + 1,
        },
      };
    }
    case CustomerRegistrationActionEnum.SetWindowActiveToPrevious: {
      return {
        ...state,
        window: {
          ...state.window,
          active: state.window.active - 1,
        },
      };
    }
    case CustomerRegistrationActionEnum.SetQuestionnaireAnswers: {
      return {
        ...state,
        answers: { ...state.answers, ...action.payload },
      };
    }

    default:
      return state;
  }
};

// Agreement
export const CustomerRegistrationAgreementReducer = (
  state: CustomerRegistrationAgreement,
  action: CustomerRegistrationActions
) => {
  switch (action.type) {
    case CustomerRegistrationActionEnum.SetAgreementAnswers:
      return {
        ...state,
        questionnaire: {
          ...state.questionnaire,
          answers: { ...state.questionnaire.answers, ...action.payload },
        },
      };

    default:
      return state;
  }
};
