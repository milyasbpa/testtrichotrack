import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerInsightActions,
  CustomerInsightInitialStateType,
} from "./CustomerInsight.types";
import {
  CustomerInsightRatingReducer,
  CustomerInsightFilterReducer,
} from "./CustomerInsight.reducers";

const initialState: CustomerInsightInitialStateType = {
  filter: {
    start_age: {
      selected: null,
    },
    end_age: {
      selected: null,
    },
    gender: {
      selected: null,
    },
    race: {
      selected: null,
    },
    resolution: {
      selected: null,
    },
  },

  rating: {},
};

const CustomerInsightContext = createContext<{
  state: CustomerInsightInitialStateType;
  dispatch: Dispatch<CustomerInsightActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filter, rating }: CustomerInsightInitialStateType,
  action: CustomerInsightActions
) => ({
  filter: CustomerInsightFilterReducer(filter, action),
  rating: CustomerInsightRatingReducer(rating, action),
});

const CustomerInsightProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerInsightContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerInsightContext.Provider>
  );
};

export { CustomerInsightProvider, CustomerInsightContext };
