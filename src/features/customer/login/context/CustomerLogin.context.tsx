import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerLoginActions,
  CustomerLoginInitialStateType,
} from "./CustomerLogin.types";
import { CustomerLoginPhonenumberReducer } from "./CustomerLogin.reducers";

const initialState: CustomerLoginInitialStateType = {
  form: {
    phonenumber: {
      value: "",
    },

    otp: {
      verified: undefined,
      feature: {
        is_open: false,
      },
    },
  },
};

const CustomerLoginContext = createContext<{
  state: CustomerLoginInitialStateType;
  dispatch: Dispatch<CustomerLoginActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: CustomerLoginInitialStateType,
  action: CustomerLoginActions
) => ({
  form: CustomerLoginPhonenumberReducer(form, action),
});

const CustomerLoginProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerLoginContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerLoginContext.Provider>
  );
};

export { CustomerLoginProvider, CustomerLoginContext };
