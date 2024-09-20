import {
  CompanyLogoActionEnum,
  CompanyLogoActions,
  CompanyLogoNotifications,
  CompanyLogoUploader,
} from "./Logo.company.types";

// uploader
export const CompanyLogoUploaderReducer = (
  state: CompanyLogoUploader,
  action: CompanyLogoActions
) => {
  switch (action.type) {
    case CompanyLogoActionEnum.SetUploaderData:
      return action.payload;
    case CompanyLogoActionEnum.SetImageUploader:
      return {
        ...state,
        image: action.payload,
      };

    case CompanyLogoActionEnum.ValidateImage:
      return {
        ...state,
        isValid: action.payload,
      };

    default:
      return state;
  }
};

// notifications
export const CompanyLogoNotificationsReducer = (
  state: CompanyLogoNotifications,
  action: CompanyLogoActions
) => {
  switch (action.type) {
    case CompanyLogoActionEnum.SetNotificationsData:
      return action.payload;

    case CompanyLogoActionEnum.SetModalData: {
      return {
        ...state,
        modal: action.payload,
      };
    }

    default:
      return state;
  }
};
