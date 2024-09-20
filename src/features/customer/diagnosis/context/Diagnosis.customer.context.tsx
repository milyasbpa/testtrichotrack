import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerDiagnosisActions,
  CustomerDiagnosisInitialStateType,
} from "./Diagnosis.customer.types";
import {
  CustomerDiagnosisOverviewReducer,
  CustomerDiagnosisScreeningReducer,
  CustomerDiagnosisTrendsReducer,
  CustomerDiagnosisTimelineReducer,
  CustomerDiagnosisTypeReducer,
} from "./Diagnosis.customer.reducers";

const initialState: CustomerDiagnosisInitialStateType = {
  type: {
    selected: null,
  },
  timeline: {
    skip: 0,
    selected: null,
    data: [],
  },
  overview: {
    data: null,
  },
  screening: {
    data: null,
  },
  trends: {
    data: [],
  },
};

const CustomerDiagnosisContext = createContext<{
  state: CustomerDiagnosisInitialStateType;
  dispatch: Dispatch<CustomerDiagnosisActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    type,
    timeline,
    overview,
    screening,
    trends,
  }: CustomerDiagnosisInitialStateType,
  action: CustomerDiagnosisActions
) => ({
  type: CustomerDiagnosisTypeReducer(type, action),
  timeline: CustomerDiagnosisTimelineReducer(timeline, action),
  overview: CustomerDiagnosisOverviewReducer(overview, action),
  screening: CustomerDiagnosisScreeningReducer(screening, action),
  trends: CustomerDiagnosisTrendsReducer(trends, action),
});

const CustomerDiagnosisProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerDiagnosisContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerDiagnosisContext.Provider>
  );
};

export { CustomerDiagnosisProvider, CustomerDiagnosisContext };
