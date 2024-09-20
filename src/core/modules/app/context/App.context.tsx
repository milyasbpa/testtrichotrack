import React, { createContext, useReducer, Dispatch } from "react";
import { AppActions, AppInitialStateType } from "./App.types";
import {
  AppAuthReducer,
  AppCasesReducer,
  AppCompanyReducer,
  AppDeviceReducer,
  AppErrorReducer,
  AppLanguageReducer,
  AppMenuReducer,
  AppNotificationReducer,
  AppPlatformReducer,
  AppReportReducer,
  AppScreenReducer,
  AppUserGuideReducer,
  AppUserReducer,
  AppVersionReducer,
} from "./App.reducers";

const initialState: AppInitialStateType = {
  notification: {
    items: [],
  },
  auth: {
    is_authenticated: undefined,
    role: null,
  },
  user: {
    staff: null,
    customer: null,
    outlet: null,
  },
  version: {
    api: null,
  },
  company: {
    image_url: null,
  },
  menu: {
    is_open: false,
  },
  platform: {
    mode: undefined,
  },
  screen: {
    is_fullscreen: false,
  },
  language: {
    feature: {
      is_open: false,
      selected: null,
    },
  },
  user_guide: {
    feature: {
      is_open: false,
    },
  },
  error: {
    status: false,
    code: null,
  },
  cases: {
    data: {
      loading: false,
      limit: 5,
      page: 0,
      selected: null,
      data: [],
    },
    record: {
      global: [],
      routine: [],
      spotlight: [],
    },
    diagnosis: {
      overview: {
        data: null,
      },
      screening: {
        data: null,
      },
      trends: {
        data: [],
      },
    },
  },
  report: {
    feature: {
      is_open: false,
      step: "preview",
      data: {
        image_url: null,
      },
    },
  },
  device: {
    microscope: {
      selected: null,
      data: {
        usb: [],
        wireless: [],
        camera: [],
      },
    },
  },
};

const AppContext = createContext<{
  state: AppInitialStateType;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    notification,
    auth,
    user,
    version,
    company,
    menu,
    platform,
    screen,
    language,
    user_guide,
    error,
    cases,
    report,
    device,
  }: AppInitialStateType,
  action: AppActions
) => ({
  notification: AppNotificationReducer(notification, action),
  auth: AppAuthReducer(auth, action),
  user: AppUserReducer(user, action),
  version: AppVersionReducer(version, action),
  company: AppCompanyReducer(company, action),
  menu: AppMenuReducer(menu, action),
  platform: AppPlatformReducer(platform, action),
  screen: AppScreenReducer(screen, action),
  language: AppLanguageReducer(language, action),
  user_guide: AppUserGuideReducer(user_guide, action),
  error: AppErrorReducer(error, action),
  cases: AppCasesReducer(cases, action),
  report: AppReportReducer(report, action),
  device: AppDeviceReducer(device, action),
});

const AppProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
