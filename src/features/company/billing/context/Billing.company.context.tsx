import React, { createContext, useReducer, Dispatch } from "react";
import {
  CompanyBillingActions,
  CompanyBillingInitialStateType,
} from "./Billing.company.types";
import { CompanyBillingProfileReducer } from "./Billing.company.reducers";

const initialState: CompanyBillingInitialStateType = {
  profile: {
    alert: null,
    tier_name: {
      en: "",
      zh: "",
    },
    type: "credit",
    expired_date: "DD / MM / YYYY",
    day_remaining: null,
    credit: null,
    outlet: {
      number: null,
      limit: null,
    },
    staff: {
      number: null,
      limit: null,
    },
    customers: {
      number: null,
      limit: null,
    },
  },
};

const CompanyBillingContext = createContext<{
  state: CompanyBillingInitialStateType;
  dispatch: Dispatch<CompanyBillingActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: CompanyBillingInitialStateType,
  action: CompanyBillingActions
) => ({
  profile: CompanyBillingProfileReducer(profile, action),
});

const CompanyBillingProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CompanyBillingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CompanyBillingContext.Provider>
  );
};

export { CompanyBillingProvider, CompanyBillingContext };
