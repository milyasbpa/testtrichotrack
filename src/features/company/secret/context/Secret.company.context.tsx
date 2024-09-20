import React, { createContext, useReducer, Dispatch } from "react";
import {
  SecretCompanyActions,
  SecretCompanyInitialStateType,
} from "./Secret.company.types";
import { SecretCompanyFormReducer } from "./Secret.company.reducers";

const initialState: SecretCompanyInitialStateType = {
  form: {
    secret: {
      value: "",
      show: false,
    },
  },
};

const SecretCompanyContext = createContext<{
  state: SecretCompanyInitialStateType;
  dispatch: Dispatch<SecretCompanyActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: SecretCompanyInitialStateType,
  action: SecretCompanyActions
) => ({
  form: SecretCompanyFormReducer(form, action),
});

const SecretCompanyProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SecretCompanyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SecretCompanyContext.Provider>
  );
};

export { SecretCompanyProvider, SecretCompanyContext };
