import React, { createContext, useReducer, Dispatch } from "react";
import {
  CustomerBusinessAnalyticsActions,
  CustomerBusinessAnalyticsInitialStateType,
} from "./CustomerBusinessAnalytics.types";
import {
  CustomerBusinessAnalyticsCustomerRegistrationReducer,
  CustomerBusinessAnalyticsCustomerVisitDistributionReducer,
  CustomerBusinessAnalyticsCustomerVisitReducer,
  CustomerBusinessAnalyticsFilterReducer,
  CustomerBusinessAnalyticsReportRequestReducer,
} from "./CustomerBusinessAnalytics.reducers";
import moment from "moment";

const initialState: CustomerBusinessAnalyticsInitialStateType = {
  customer_visit_distribution: {
    data: [],
    labels: [],
  },
  filter: {
    start_date: moment().subtract(7, "days").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    resolution: {
      selected: {
        id: "Day",
        name: "Day",
      },
    },
    outlets: {
      selected: {
        id: "All Outlets",
        name: "All Outlets",
      },
      data: [],
    },
  },
  customer_visit: {
    data: [],
    labels: [],
  },
  customer_registration: {
    data: [],
    labels: [],
  },
  report_request: {
    data: [],
    labels: [],
  },
};

const CustomerBusinessAnalyticsContext = createContext<{
  state: CustomerBusinessAnalyticsInitialStateType;
  dispatch: Dispatch<CustomerBusinessAnalyticsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    customer_visit_distribution,
    filter,
    customer_visit,
    customer_registration,
    report_request,
  }: CustomerBusinessAnalyticsInitialStateType,
  action: CustomerBusinessAnalyticsActions
) => ({
  customer_visit_distribution:
    CustomerBusinessAnalyticsCustomerVisitDistributionReducer(
      customer_visit_distribution,
      action
    ),
  filter: CustomerBusinessAnalyticsFilterReducer(filter, action),
  customer_visit: CustomerBusinessAnalyticsCustomerVisitReducer(
    customer_visit,
    action
  ),
  customer_registration: CustomerBusinessAnalyticsCustomerRegistrationReducer(
    customer_registration,
    action
  ),
  report_request: CustomerBusinessAnalyticsReportRequestReducer(
    report_request,
    action
  ),
});

const CustomerBusinessAnalyticsProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CustomerBusinessAnalyticsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CustomerBusinessAnalyticsContext.Provider>
  );
};

export { CustomerBusinessAnalyticsProvider, CustomerBusinessAnalyticsContext };
