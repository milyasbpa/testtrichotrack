import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerListActions,
  CustomerListInitialStateType,
} from "./List.customer.types";
import { CustomerListCustomersReducer } from "./List.customer.reducers";

const initialState: CustomerListInitialStateType = {
  customers: {
    selected: {
      id: "",
    },
    search: {
      value: "",
    },
    sort: {
      by: "Registration Descending",
    },
    list: [],
  },
};

const CustomerListContext = createContext<{
  state: CustomerListInitialStateType;
  dispatch: Dispatch<CustomerListActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { customers }: CustomerListInitialStateType,
  action: CustomerListActions
) => ({
  customers: CustomerListCustomersReducer(customers, action),
});

const CustomerListProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerListContext.Provider>
  );
};

export { CustomerListProvider, CustomerListContext };
