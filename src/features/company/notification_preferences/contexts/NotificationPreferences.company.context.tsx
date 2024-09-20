import React, { createContext, useReducer, Dispatch } from "react";
import {
  ClientNotificationPreferencesActions,
  ClientNotificationPreferencesInitialStateType,
} from "./NotificationPreferences.company.types";
import {
  ClientNotificationPreferencesAlertReducer,
  ClientNotificationPreferencesFormReducer,
} from "./NotificationPreferences.company.reducers";

const initialState: ClientNotificationPreferencesInitialStateType = {
  form: {
    type: null,
    email: {
      value: "",
    },
    phonenumber: {
      value: "",
    },

    confirmation_modal: {
      open: false,
    },
    subscription_threshold: {
      value: "",
      error: {
        code: "",
        condition: false,
      },
    },
    credit_threshold: {
      value: "",
      error: {
        code: "",
        condition: false,
      },
    },
  },
  alert: {
    open: false,
    variant: "success",
    type: "",
  },
};

const ClientNotificationPreferencesContext = createContext<{
  state: ClientNotificationPreferencesInitialStateType;
  dispatch: Dispatch<ClientNotificationPreferencesActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form, alert }: ClientNotificationPreferencesInitialStateType,
  action: ClientNotificationPreferencesActions
) => ({
  form: ClientNotificationPreferencesFormReducer(form, action),
  alert: ClientNotificationPreferencesAlertReducer(alert, action),
});

const ClientNotificationPreferencesProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ClientNotificationPreferencesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ClientNotificationPreferencesContext.Provider>
  );
};

export {
  ClientNotificationPreferencesProvider,
  ClientNotificationPreferencesContext,
};
