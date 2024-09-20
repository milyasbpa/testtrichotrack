import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerCarePlansActions,
  CustomerCarePlansInitialStateType,
} from "./CarePlans.customer.types";
import {
  CustomerCarePlansDiagnosisReducer,
  CustomerCarePlansCarePlansReducer,
} from "./CarePlans.customer.reducers";

const initialState: CustomerCarePlansInitialStateType = {
  diagnosis: {
    overview: {
      data: null,
    },
  },
  careplans: {
    procedure: {
      selected: null,
    },
    data: null,
  },
};

const CustomerCarePlansContext = createContext<{
  state: CustomerCarePlansInitialStateType;
  dispatch: Dispatch<CustomerCarePlansActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { diagnosis, careplans }: CustomerCarePlansInitialStateType,
  action: CustomerCarePlansActions
) => ({
  diagnosis: CustomerCarePlansDiagnosisReducer(diagnosis, action),
  careplans: CustomerCarePlansCarePlansReducer(careplans, action),
});

const CustomerCarePlansProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerCarePlansContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerCarePlansContext.Provider>
  );
};

export { CustomerCarePlansProvider, CustomerCarePlansContext };
