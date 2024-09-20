import {
  CustomerProfileActionEnum,
  CustomerProfileActions,
  CustomerProfilePersonalData,
  CustomerProfileGlobal,
} from "./Profile.customer.types";

// GLOBAL
export const CustomerProfileGlobalReducer = (
  state: CustomerProfileGlobal,
  action: CustomerProfileActions
) => {
  switch (action.type) {
    case CustomerProfileActionEnum.SetGlobal:
      return action.payload;

    case CustomerProfileActionEnum.ChangeStateToAdditionalInformation:
      return {
        ...state,
        state: "additional-info",
      };
    case CustomerProfileActionEnum.ClickSavePersonalData:
      return {
        ...state,
        state: "confirmation",
      };
    case CustomerProfileActionEnum.ClickTakeProfilePictureRequiredInformation:
      return {
        ...state,
        state: "profile-picture",
      };

    case CustomerProfileActionEnum.ClickNoConfirmation:
      return {
        ...state,
        state: "personal-data",
      };

    case CustomerProfileActionEnum.ClickRetakeProfilePicturePreview:
      return {
        ...state,
        state: "profile-picture",
      };
    case CustomerProfileActionEnum.ClickYesProfilePicturePreview:
      return {
        ...state,
        state: "personal-data",
        profile_picture: {
          ...state.profile_picture,
          value: state.profile_picture.new_value,
          new_value: "",
        },
      };
    case CustomerProfileActionEnum.ClickBackProfilePicture:
      return {
        ...state,
        state: "personal-data",
      };
    case CustomerProfileActionEnum.ClickTakeAPictureProfilePicture:
      return {
        ...state,
        state: "profile-picture-preview",
      };
    case CustomerProfileActionEnum.ChangeProfilePictureValue:
      return {
        ...state,
        profile_picture: {
          ...state.profile_picture,
          new_value: action.payload,
        },
      };

    default:
      return state;
  }
};

// Personal Data
export const CustomerProfilePersonalDataReducer = (
  state: CustomerProfilePersonalData,
  action: CustomerProfileActions
) => {
  switch (action.type) {
    case CustomerProfileActionEnum.SetCustomerProfilePersonalDataValue: {
      return action.payload;
    }

    case CustomerProfileActionEnum.ChangeMarketingPromotionValue: {
      return {
        ...state,
        marketing_promotion: {
          ...state.marketing_promotion,
          value: !state.marketing_promotion.value,
        },
      };
    }

    default:
      return state;
  }
};
