import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerScreeningActions,
  CustomerScreeningInitialStateType,
} from "./Screening.customer.types";
import {
  CustomerScreeningAnnotationsReducer,
  CustomerScreeningScanReducer,
  CustomerScreeningGroupReducer,
  CustomerScreeningScreeningReducer,
} from "./Screening.customer.reducers";

const initialState: CustomerScreeningInitialStateType = {
  scan: {
    region: "Left Crown",
    image: "/images/sample-scan.png",

    id: -1,
    svc_time: "2023-01-04 05:49:55.210548",
  },
  group: {
    selected: null,
  },
  annotations: {
    hair: {
      data: [],
    },
    pimple: {
      data: [],
    },
    follicle: {
      data: [],
    },
    dandruff: {
      data: [],
    },
  },
  screening: {
    data: null,
  },
};

const CustomerScreeningContext = createContext<{
  state: CustomerScreeningInitialStateType;
  dispatch: Dispatch<CustomerScreeningActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { scan, group, annotations, screening }: CustomerScreeningInitialStateType,
  action: CustomerScreeningActions
) => ({
  scan: CustomerScreeningScanReducer(scan, action),
  group: CustomerScreeningGroupReducer(group, action),
  annotations: CustomerScreeningAnnotationsReducer(annotations, action),
  screening: CustomerScreeningScreeningReducer(screening, action),
});

const CustomerScreeningProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerScreeningContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerScreeningContext.Provider>
  );
};

export { CustomerScreeningProvider, CustomerScreeningContext };
