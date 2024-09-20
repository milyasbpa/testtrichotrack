import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerRecommendationActions,
  CustomerRecommendationInitialStateType,
} from "./Recommendation.customer.types";
import {
  CustomerRecommendationRecordReducer,
  CustomerRecommendationOverallReducer,
} from "./Recommendation.customer.reducers";

const initialState: CustomerRecommendationInitialStateType = {
  overall: {
    data: [],
  },
  record: {
    id: 2,
    list: ["Scan Records", "Diagnosis", "Recommendation"],
  },
};

const CustomerRecommendationContext = createContext<{
  state: CustomerRecommendationInitialStateType;
  dispatch: Dispatch<CustomerRecommendationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { overall, record }: CustomerRecommendationInitialStateType,
  action: CustomerRecommendationActions
) => ({
  overall: CustomerRecommendationOverallReducer(overall, action),
  record: CustomerRecommendationRecordReducer(record, action),
});

const CustomerRecommendationProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerRecommendationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerRecommendationContext.Provider>
  );
};

export { CustomerRecommendationProvider, CustomerRecommendationContext };
