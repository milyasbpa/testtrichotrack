import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerStatisticsActions,
  CustomerStatisticsInitialStateType,
} from "./CustomerStatistics.types";
import {
  CustomerStatisticsAgeReducer,
  CustomerStatisticsGenderReducer,
  CustomerStatisticsRaceReducer,
} from "./CustomerStatistics.reducers";

const initialState: CustomerStatisticsInitialStateType = {
  gender: {
    labels: [],
    data: [],
  },
  race: {
    labels: [],
    data: [],
  },
  age: {
    raw_data: [],
    start_age: {
      selected: null,
    },
    end_age: {
      selected: null,
    },
    resolution: {
      selected: null,
    },
    gender: {
      selected: null,
    },
    available_slot: 0,
    labels: [],
    data: [],
  },
};

const CustomerStatisticsContext = createContext<{
  state: CustomerStatisticsInitialStateType;
  dispatch: Dispatch<CustomerStatisticsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { gender, race, age }: CustomerStatisticsInitialStateType,
  action: CustomerStatisticsActions
) => ({
  gender: CustomerStatisticsGenderReducer(gender, action),
  race: CustomerStatisticsRaceReducer(race, action),
  age: CustomerStatisticsAgeReducer(age, action),
});

const CustomerStatisticsProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerStatisticsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerStatisticsContext.Provider>
  );
};

export { CustomerStatisticsProvider, CustomerStatisticsContext };
