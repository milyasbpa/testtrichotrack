import React, { createContext, useReducer, Dispatch } from "react";
import {
  StaffEditActions,
  StaffEditInitialStateType,
} from "./Edit.staff.types";
import { StaffEditFormReducer } from "./Edit.staff.reducers";

const initialState: StaffEditInitialStateType = {
  form: {
    id: undefined,
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

const StaffEditContext = createContext<{
  state: StaffEditInitialStateType;
  dispatch: Dispatch<StaffEditActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: StaffEditInitialStateType,
  action: StaffEditActions
) => ({
  form: StaffEditFormReducer(form, action),
});

const StaffEditProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffEditContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffEditContext.Provider>
  );
};

export { StaffEditProvider, StaffEditContext };
