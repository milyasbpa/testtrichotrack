import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerQuestionnaireActions,
  CustomerQuestionnaireInitialStateType,
} from "./Questionnaire.customer.types";
import {
  CustomerQuestionnaireGlobalReducer,
  CustomerQuestionnaireReducer,
} from "./Questionnaire.customer.reducers";

const initialState: CustomerQuestionnaireInitialStateType = {
  global: {
    state: "questionnaire",
  },
  questionnaire: {
    id: undefined,
    gender: undefined,
    window: {
      active: 1,
      limit: 3,
    },
    answers: {},
  },
};

const CustomerQuestionnaireContext = createContext<{
  state: CustomerQuestionnaireInitialStateType;
  dispatch: Dispatch<CustomerQuestionnaireActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { global, questionnaire }: CustomerQuestionnaireInitialStateType,
  action: CustomerQuestionnaireActions
) => ({
  global: CustomerQuestionnaireGlobalReducer(global, action),
  questionnaire: CustomerQuestionnaireReducer(questionnaire, action),
});

const CustomerQuestionnaireProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerQuestionnaireContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerQuestionnaireContext.Provider>
  );
};

export { CustomerQuestionnaireProvider, CustomerQuestionnaireContext };
