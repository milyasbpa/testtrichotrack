import React, { createContext, useReducer, Dispatch } from "react";
import {
  OutletAddActions,
  OutletAddInitialStateType,
} from "./Add.outlet.types";
import { OutletAddFormReducer } from "./Add.outlet.reducers";

const initialState: OutletAddInitialStateType = {
  // Required Information
  form: {
    photo_profile: {
      value: "",
    },
    fullname: {
      value: "",
      error: null,
    },

    address: {
      value: "",
    },

    phonenumber: {
      value: "",
    },

    confirmation_modal: {
      open: false,
    },
  },
};

const OutletAddContext = createContext<{
  state: OutletAddInitialStateType;
  dispatch: Dispatch<OutletAddActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: OutletAddInitialStateType,
  action: OutletAddActions
) => ({
  form: OutletAddFormReducer(form, action),
});

const OutletAddProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OutletAddContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OutletAddContext.Provider>
  );
};

export { OutletAddProvider, OutletAddContext };
