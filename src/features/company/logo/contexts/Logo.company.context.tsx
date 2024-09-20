import React, { createContext, useReducer, Dispatch } from "react";
import {
  CompanyLogoActions,
  CompanyLogoInitialStateType,
} from "./Logo.company.types";
import {
  CompanyLogoNotificationsReducer,
  CompanyLogoUploaderReducer,
} from "./Logo.company.reducers";

const initialState: CompanyLogoInitialStateType = {
  uploader: {
    image: "",
    isValid: false,
  },
  notifications: {
    modal: {
      open: false,
    },
  },
};

const CompanyLogoContext = createContext<{
  state: CompanyLogoInitialStateType;
  dispatch: Dispatch<CompanyLogoActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { uploader, notifications }: CompanyLogoInitialStateType,
  action: CompanyLogoActions
) => ({
  uploader: CompanyLogoUploaderReducer(uploader, action),
  notifications: CompanyLogoNotificationsReducer(notifications, action),
});

const CompanyLogoProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CompanyLogoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CompanyLogoContext.Provider>
  );
};

export { CompanyLogoProvider, CompanyLogoContext };
