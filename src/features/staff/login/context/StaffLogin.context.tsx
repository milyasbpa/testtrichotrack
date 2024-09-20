import React, { createContext, useReducer, Dispatch } from "react";
import {
  StaffLoginActions,
  StaffLoginInitialStateType,
} from "./StaffLogin.types";
import { StaffLoginFormReducer } from "./StaffLogin.reducers";

const initialState: StaffLoginInitialStateType = {
  form: {
    phonenumber: {
      value: "",
    },
    password: {
      value: "",
    },
  },
};

const StaffLoginContext = createContext<{
  state: StaffLoginInitialStateType;
  dispatch: Dispatch<StaffLoginActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: StaffLoginInitialStateType,
  action: StaffLoginActions
) => ({
  form: StaffLoginFormReducer(form, action),
});

const StaffLoginProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StaffLoginContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffLoginContext.Provider>
  );
};

export { StaffLoginProvider, StaffLoginContext };
