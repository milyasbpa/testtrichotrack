import {
  AppNotification,
  AppActionEnum,
  AppActions,
  AppAuth,
  AppVersion,
  AppCompany,
  AppMenu,
  AppPlatform,
  AppScreen,
  AppLanguage,
  AppUserGuide,
  AppError,
  AppUser,
  AppCases,
  AppReport,
  AppDevice,
} from "./App.types";

// Notification
export const AppNotificationReducer = (
  state: AppNotification,
  action: AppActions
) => {
  switch (action.type) {
    case AppActionEnum.SetNotificationData:
      return action.payload;
    case AppActionEnum.SetNotificationItems:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

// Auth
export const AppAuthReducer = (state: AppAuth, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetAuthData:
      return action.payload;

    default:
      return state;
  }
};

// User
export const AppUserReducer = (state: AppUser, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetUserData:
      return action.payload;

    default:
      return state;
  }
};

// Version
export const AppVersionReducer = (state: AppVersion, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetVersionData:
      return action.payload;

    default:
      return state;
  }
};

// Company
export const AppCompanyReducer = (state: AppCompany, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetCompanyData:
      return action.payload;

    default:
      return state;
  }
};

// Menu
export const AppMenuReducer = (state: AppMenu, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetMenuData:
      return action.payload;

    default:
      return state;
  }
};

// Platform
export const AppPlatformReducer = (state: AppPlatform, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetPlatformData:
      return action.payload;

    default:
      return state;
  }
};

// Screen
export const AppScreenReducer = (state: AppScreen, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetScreenData:
      return action.payload;

    default:
      return state;
  }
};

// Language
export const AppLanguageReducer = (state: AppLanguage, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetLanguageData:
      return action.payload;

    default:
      return state;
  }
};

// UserGuide
export const AppUserGuideReducer = (
  state: AppUserGuide,
  action: AppActions
) => {
  switch (action.type) {
    case AppActionEnum.SetUserGuideData:
      return action.payload;

    default:
      return state;
  }
};

// Error
export const AppErrorReducer = (state: AppError, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetErrorData:
      return action.payload;

    default:
      return state;
  }
};

// Cases
export const AppCasesReducer = (state: AppCases, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetCasesData:
      return action.payload;
    case AppActionEnum.SetGlobalRecordCasesData: {
      return {
        ...state,
        record: {
          ...state.record,
          global: action.payload,
        },
      };
    }
    case AppActionEnum.SetRoutineRecordCasesData: {
      return {
        ...state,
        record: {
          ...state.record,
          routine: action.payload,
        },
      };
    }
    case AppActionEnum.SetSpotlightRecordCasesData: {
      return {
        ...state,
        record: {
          ...state.record,
          spotlight: action.payload,
        },
      };
    }

    case AppActionEnum.SetSpotlightRecordCasesData: {
      return {
        ...state,
        record: {
          ...state.record,
          spotlight: action.payload,
        },
      };
    }
    case AppActionEnum.SetOverviewDiagnosisCasesData: {
      return {
        ...state,
        diagnosis: {
          ...state.diagnosis,
          overview: action.payload,
        },
      };
    }
    case AppActionEnum.SetScreeningDiagnosisCasesData: {
      return {
        ...state,
        diagnosis: {
          ...state.diagnosis,
          screening: action.payload,
        },
      };
    }
    case AppActionEnum.SetTrendsDiagnosisCasesData: {
      return {
        ...state,
        diagnosis: {
          ...state.diagnosis,
          trends: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

// Report
export const AppReportReducer = (state: AppReport, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetReportData:
      return action.payload;

    default:
      return state;
  }
};

// Device
export const AppDeviceReducer = (state: AppDevice, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetDeviceData:
      return action.payload;

    default:
      return state;
  }
};
