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
export interface AppInitialStateType {
  notification: AppNotification;
  auth: AppAuth;
  user: AppUser;
  version: AppVersion;
  company: AppCompany;
  menu: AppMenu;
  platform: AppPlatform;
  screen: AppScreen;
  language: AppLanguage;
  user_guide: AppUserGuide;
  error: AppError;
  cases: AppCases;
  report: AppReport;
  device: AppDevice;
}

// State Collection Types consist of:
export interface AppNotification {
  items: {
    variant: "danger" | "warning" | "info" | "success";
    id: string;
  }[];
}

export type AppAuthRole =
  | null
  | "COMPANY"
  | "ADMIN"
  | "MANAGER"
  | "EMPLOYEE"
  | "CUSTOMER";

export interface AppAuth {
  is_authenticated: boolean | undefined;
  role: AppAuthRole;
}

export interface AppUserStaff {
  id?: number;
  mobile?: string; // Sample Format: 65-111111
  name?: string;
  outlet_id?: number;
  permission?: string; // Admin | Manager | Employee | Customer
  photo?: string | null;
  position?: null | string;
  reg_time?: string;
  status?: string;
}

export interface AppUserCustomer {
  birthday?: string;
  crm_id?: null | number;
  email?: null | string;
  gender?: string;
  id?: number;
  mobile?: string;
  name?: string;
  photo?: string | null;
  race?: string | null;
  reg_time?: string;
  status?: string;
}

export interface AppUserOutlet {
  base_id: number;
  current_id?: number;
}

export interface AppUser {
  staff: null | AppUserStaff;
  customer: null | AppUserCustomer;
  outlet: null | AppUserOutlet;
}

export interface AppVersion {
  api: null | string;
}

export interface AppCompany {
  image_url: null | string;
}

export interface AppMenu {
  is_open: boolean;
}

export interface AppPlatform {
  mode: "browser" | "pwa" | undefined;
}

export interface AppScreen {
  is_fullscreen: boolean;
}

export interface AppLanguage {
  feature: {
    is_open: boolean;
    selected: { id: string; name: string } | null;
  };
}

export interface AppUserGuide {
  feature: {
    is_open: boolean;
  };
}

export interface AppError {
  status: boolean;
  code: null | string; // "session_timeout";
}

export interface AppCaseRecord {
  id: number;
  image: string;
  region: string;
}

export interface AppCases {
  data: {
    page: number;
    limit: number;
    loading: boolean;
    selected: null | { id: string; svc_time: string };
    data: {
      id: string;
      svc_time: string;
    }[];
  };
  record: {
    global: AppCaseRecord[];
    routine: AppCaseRecord[];
    spotlight: AppCaseRecord[];
  };
  diagnosis: {
    overview: {
      data: null | {
        [key: string]: {
          name: string;
          rating: number;
          level: string;
        };
      };
    };
    screening: {
      data: null | {
        [key: string]: {
          name: string;
          unit: string;
          description: string;
          mapping_figure: string;
          value:
            | number
            | {
                [key: string]: number;
              };
        };
      };
    };
    trends: {
      data: {
        svc_time: string;
        overview: {
          [key: string]: number;
        };
      }[];
    };
  };
}

export interface AppReport {
  feature: {
    is_open: boolean;
    step: string; // preview | qris,
    data: {
      image_url: null | string;
    };
  };
}

export interface AppDevice {
  microscope: {
    selected: {
      id: number;
      name: string;
      photo: string;
      connection: string;
      device_id: string;
    } | null;
    data: {
      usb: {
        id: number;
        name: string;
        photo: string;
        connection: string;
        device_id: string;
      }[];
      wireless: {
        id: number;
        name: string;
        photo: string;
        connection: string;
        device_id: string;
      }[];
      camera: {
        id: number;
        name: string;
        photo: string;
        connection: string;
        device_id: string;
      }[];
    };
  };
}

export enum AppActionEnum {
  // Notification
  SetNotificationData = "SetNotificationData",
  SetNotificationItems = "SetNotificationItems",

  // Auth
  SetAuthData = "SetAuthData",

  // User
  SetUserData = "SetUserData",

  // Version
  SetVersionData = "SetVersionData",

  // Company
  SetCompanyData = "SetCompanyData",

  // Menu
  SetMenuData = "SetMenuData",

  // Platform
  SetPlatformData = "SetPlatformData",

  // Fullscreen
  SetScreenData = "SetScreenData",

  // Language
  SetLanguageData = "SetLanguageData",

  // UserGuide
  SetUserGuideData = "SetUserGuideData",

  // Error
  SetErrorData = "SetErrorData",

  // Cases
  SetCasesData = "SetCasesData",
  // avoid overlap
  SetRoutineRecordCasesData = "SetRoutineRecordCasesData",
  SetSpotlightRecordCasesData = "SetSpotlightRecordCasesData",
  SetGlobalRecordCasesData = "SetGlobalRecordCasesData",
  SetOverviewDiagnosisCasesData = "SetOverviewDiagnosisCasesData",
  SetScreeningDiagnosisCasesData = "SetScreeningDiagnosisCasesData",
  SetTrendsDiagnosisCasesData = "SetTrendsDiagnosisCasesData",

  // Report
  SetReportData = "SetReportData",

  // Device
  SetDeviceData = "SetDeviceData",
}

// Action Collection Types
export type AppActions =
  | AppNotificationActions
  | AppAuthActions
  | AppUserActions
  | AppVersionActions
  | AppCompanyActions
  | AppMenuActions
  | AppPlatformActions
  | AppScreenActions
  | AppLanguageActions
  | AppUserGuideActions
  | AppErrorActions
  | AppCasesActions
  | AppReportActions
  | AppDeviceActions;

// Action Collection Types consist of:
// Notification
type AppNotificationPayload = {
  [AppActionEnum.SetNotificationData]: AppNotification;
  [AppActionEnum.SetNotificationItems]: AppNotification["items"];
};

export type AppNotificationActions =
  ActionMap<AppNotificationPayload>[keyof ActionMap<AppNotificationPayload>];

// Auth
type AppAuthPayload = {
  [AppActionEnum.SetAuthData]: AppAuth;
};

export type AppAuthActions =
  ActionMap<AppAuthPayload>[keyof ActionMap<AppAuthPayload>];

// User
type AppUserPayload = {
  [AppActionEnum.SetUserData]: AppUser;
};

export type AppUserActions =
  ActionMap<AppUserPayload>[keyof ActionMap<AppUserPayload>];

// Version
type AppVersionPayload = {
  [AppActionEnum.SetVersionData]: AppVersion;
};

export type AppVersionActions =
  ActionMap<AppVersionPayload>[keyof ActionMap<AppVersionPayload>];

// Company
type AppCompanyPayload = {
  [AppActionEnum.SetCompanyData]: AppCompany;
};

export type AppCompanyActions =
  ActionMap<AppCompanyPayload>[keyof ActionMap<AppCompanyPayload>];

// Menu
type AppMenuPayload = {
  [AppActionEnum.SetMenuData]: AppMenu;
};

export type AppMenuActions =
  ActionMap<AppMenuPayload>[keyof ActionMap<AppMenuPayload>];

// Platform
type AppPlatformPayload = {
  [AppActionEnum.SetPlatformData]: AppPlatform;
};

export type AppPlatformActions =
  ActionMap<AppPlatformPayload>[keyof ActionMap<AppPlatformPayload>];

// Screen
type AppScreenPayload = {
  [AppActionEnum.SetScreenData]: AppScreen;
};

export type AppScreenActions =
  ActionMap<AppScreenPayload>[keyof ActionMap<AppScreenPayload>];

// Language
type AppLanguagePayload = {
  [AppActionEnum.SetLanguageData]: AppLanguage;
};

export type AppLanguageActions =
  ActionMap<AppLanguagePayload>[keyof ActionMap<AppLanguagePayload>];

// UserGuide
type AppUserGuidePayload = {
  [AppActionEnum.SetUserGuideData]: AppUserGuide;
};

export type AppUserGuideActions =
  ActionMap<AppUserGuidePayload>[keyof ActionMap<AppUserGuidePayload>];

// Error
type AppErrorPayload = {
  [AppActionEnum.SetErrorData]: AppError;
};

export type AppErrorActions =
  ActionMap<AppErrorPayload>[keyof ActionMap<AppErrorPayload>];

// Cases
type AppCasesPayload = {
  [AppActionEnum.SetCasesData]: AppCases;
  [AppActionEnum.SetGlobalRecordCasesData]: AppCases["record"]["global"];
  [AppActionEnum.SetRoutineRecordCasesData]: AppCases["record"]["routine"];
  [AppActionEnum.SetSpotlightRecordCasesData]: AppCases["record"]["spotlight"];
  [AppActionEnum.SetOverviewDiagnosisCasesData]: AppCases["diagnosis"]["overview"];
  [AppActionEnum.SetScreeningDiagnosisCasesData]: AppCases["diagnosis"]["screening"];
  [AppActionEnum.SetTrendsDiagnosisCasesData]: AppCases["diagnosis"]["trends"];
};

export type AppCasesActions =
  ActionMap<AppCasesPayload>[keyof ActionMap<AppCasesPayload>];

// Report
type AppReportPayload = {
  [AppActionEnum.SetReportData]: AppReport;
};

export type AppReportActions =
  ActionMap<AppReportPayload>[keyof ActionMap<AppReportPayload>];

// Device
type AppDevicePayload = {
  [AppActionEnum.SetDeviceData]: AppDevice;
};

export type AppDeviceActions =
  ActionMap<AppDevicePayload>[keyof ActionMap<AppDevicePayload>];
