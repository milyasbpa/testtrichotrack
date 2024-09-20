import React, { createContext, useReducer, Dispatch } from "react";
import { StaffAddActions, StaffAddInitialStateType } from "./Add.staff.types";
import { StaffAddFormReducer } from "./Add.staff.reducers";

const initialState: StaffAddInitialStateType = {
  // Required Information
  form: {
    photo_profile: {
      value: "",
    },
    fullname: {
      value: "",
    },
    password: {
      value: "",
    },
    permission: {
      selected: null,
    },

    outlets: {
      selected: null,
      query: "",
      data: [],
    },

    position: {
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

const StaffAddContext = createContext<{
  state: StaffAddInitialStateType;
  dispatch: Dispatch<StaffAddActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: StaffAddInitialStateType,
  action: StaffAddActions
) => ({
  form: StaffAddFormReducer(form, action),
});

const StaffAddProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffAddContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffAddContext.Provider>
  );
};

export { StaffAddProvider, StaffAddContext };
