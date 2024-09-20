import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerComparisonActions,
  CustomerComparisonInitialStateType,
} from "./Comparison.customer.types";
import {
  CustomerComparisonOptionsReducer,
  CustomerComparisonRawReducer,
  CustomerComparisonChartReducer,
  CustomerComparisonDetailReducer,
  CustomerComparisonCasesReducer,
} from "./Comparison.customer.reducers";

const initialState: CustomerComparisonInitialStateType = {
  options: {
    selected: null,
  },
  cases: {
    data: [],
  },
  raw: [],
  chart: [],
  detail: [],
};

const CustomerComparisonContext = createContext<{
  state: CustomerComparisonInitialStateType;
  dispatch: Dispatch<CustomerComparisonActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { options, cases, raw, chart, detail }: CustomerComparisonInitialStateType,
  action: CustomerComparisonActions
) => ({
  options: CustomerComparisonOptionsReducer(options, action),
  cases: CustomerComparisonCasesReducer(cases, action),
  raw: CustomerComparisonRawReducer(raw, action),
  chart: CustomerComparisonChartReducer(chart, action),
  detail: CustomerComparisonDetailReducer(detail, action),
});

const CustomerComparisonProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerComparisonContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerComparisonContext.Provider>
  );
};

export { CustomerComparisonProvider, CustomerComparisonContext };
