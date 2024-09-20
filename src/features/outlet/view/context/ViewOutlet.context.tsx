import React, { createContext, useReducer, Dispatch } from "react";
import {
  ViewOutletActions,
  ViewOutletInitialStateType,
} from "./ViewOutlet.types";
import { ViewOutletFormReducer } from "./ViewOutlet.reducers";

const initialState: ViewOutletInitialStateType = {
  // Required Information
  form: {
    id: undefined,
    photo_profile: {
      value: "",
    },
    fullname: {
      value: "",
    },

    address: {
      value: "",
    },

    phonenumber: {
      value: "",
    },

    country_code: {
      value: "",
      feature: {
        is_open: false,
      },
    },

    confirmation_modal: {
      open: false,
    },
  },
};

const ViewOutletContext = createContext<{
  state: ViewOutletInitialStateType;
  dispatch: Dispatch<ViewOutletActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: ViewOutletInitialStateType,
  action: ViewOutletActions
) => ({
  form: ViewOutletFormReducer(form, action),
});

const ViewOutletProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ViewOutletContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ViewOutletContext.Provider>
  );
};

export { ViewOutletProvider, ViewOutletContext };
