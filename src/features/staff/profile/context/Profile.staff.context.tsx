import React, { createContext, useReducer, Dispatch } from "react";
import {
  StaffProfileActions,
  StaffProfileInitialStateType,
} from "./Profile.staff.types";
import { StaffProfileFormReducer } from "./Profile.staff.reducers";

const initialState: StaffProfileInitialStateType = {
  form: {
    id: undefined,
    edit: false,
    photo_profile: {
      initial: "",
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

    relogin_modal: {
      open: false,
    },
  },
};

const StaffProfileContext = createContext<{
  state: StaffProfileInitialStateType;
  dispatch: Dispatch<StaffProfileActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: StaffProfileInitialStateType,
  action: StaffProfileActions
) => ({
  form: StaffProfileFormReducer(form, action),
});

const StaffProfileProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffProfileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffProfileContext.Provider>
  );
};

export { StaffProfileProvider, StaffProfileContext };
