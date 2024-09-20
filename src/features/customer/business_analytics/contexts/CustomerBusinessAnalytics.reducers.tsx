import {
  ICustomerBusinessAnalyticsCustomerVisitDistribution,
  CustomerBusinessAnalyticsActionEnum,
  CustomerBusinessAnalyticsActions,
  ICustomerBusinessAnalyticsCustomerRegistration,
  ICustomerBusinessAnalyticsCustomerVisit,
  ICustomerBusinessAnalyticsFilter,
  ICustomerBusinessAnalyticsReportRequest,
} from "./CustomerBusinessAnalytics.types";
import moment from "moment";

export const CustomerBusinessAnalyticsCustomerVisitDistributionReducer = (
  state: ICustomerBusinessAnalyticsCustomerVisitDistribution,
  action: CustomerBusinessAnalyticsActions
) => {
  switch (action.type) {
    case CustomerBusinessAnalyticsActionEnum.SetCustomerVisitDistributionData:
      return action.payload;

    default:
      return state;
  }
};

export const CustomerBusinessAnalyticsFilterReducer = (
  state: ICustomerBusinessAnalyticsFilter,
  action: CustomerBusinessAnalyticsActions
) => {
  switch (action.type) {
    case CustomerBusinessAnalyticsActionEnum.SetFilterData:
      return action.payload;
    case CustomerBusinessAnalyticsActionEnum.SelectDate:
      return {
        ...state,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
      };
    case CustomerBusinessAnalyticsActionEnum.SelectResolution:
      return {
        ...state,
        resolution: {
          ...state.resolution,
          selected: action.payload,
        },
        start_date:
          action.payload.name.toLowerCase() === "day"
            ? moment().subtract(1, "week").format("YYYY-MM-DD")
            : action.payload.name.toLowerCase() === "week"
            ? moment().subtract(1, "month").format("YYYY-MM-DD")
            : moment().subtract(1, "year").format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      };
    case CustomerBusinessAnalyticsActionEnum.SetOutletsData:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          data: action.payload,
        },
      };
    case CustomerBusinessAnalyticsActionEnum.FilterByOutlet:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          selected: action.payload,
        },
      };

    default:
      return state;
  }
};

export const CustomerBusinessAnalyticsCustomerVisitReducer = (
  state: ICustomerBusinessAnalyticsCustomerVisit,
  action: CustomerBusinessAnalyticsActions
) => {
  switch (action.type) {
    case CustomerBusinessAnalyticsActionEnum.SetCustomerVisitData:
      return action.payload;

    default:
      return state;
  }
};

export const CustomerBusinessAnalyticsCustomerRegistrationReducer = (
  state: ICustomerBusinessAnalyticsCustomerRegistration,
  action: CustomerBusinessAnalyticsActions
) => {
  switch (action.type) {
    case CustomerBusinessAnalyticsActionEnum.SetCustomerRegistrationData:
      return action.payload;

    default:
      return state;
  }
};

export const CustomerBusinessAnalyticsReportRequestReducer = (
  state: ICustomerBusinessAnalyticsReportRequest,
  action: CustomerBusinessAnalyticsActions
) => {
  switch (action.type) {
    case CustomerBusinessAnalyticsActionEnum.SetReportRequestData:
      return action.payload;

    default:
      return state;
  }
};
