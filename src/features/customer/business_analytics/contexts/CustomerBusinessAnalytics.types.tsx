type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface CustomerBusinessAnalyticsInitialStateType {
  customer_visit_distribution: ICustomerBusinessAnalyticsCustomerVisitDistribution;
  filter: ICustomerBusinessAnalyticsFilter;
  customer_visit: ICustomerBusinessAnalyticsCustomerVisit;
  customer_registration: ICustomerBusinessAnalyticsCustomerRegistration;
  report_request: ICustomerBusinessAnalyticsReportRequest;
}

// State Collection Types consist of:
// CustomerVisitDistribution
export interface ICustomerBusinessAnalyticsCustomerVisitDistribution {
  data: number[];
  labels: string[];
}

export interface ICustomerBusinessAnalyticsFilter {
  start_date: string;
  end_date: string;
  resolution: {
    selected: {
      id: string;
      name: string;
    } | null;
  };

  outlets: {
    selected: {
      id: string;
      name: string;
    } | null;
    data: { id: string; name: string }[];
  };
}

// CustomerVisit
export interface ICustomerBusinessAnalyticsCustomerVisit {
  data: number[];
  labels: string[];
}

// CustomerVisitDistribution
export interface ICustomerBusinessAnalyticsCustomerRegistration {
  data: number[];
  labels: string[];
}

export interface ICustomerBusinessAnalyticsReportRequest {
  data: number[];
  labels: string[];
}

export enum CustomerBusinessAnalyticsActionEnum {
  // CustomerVisitDistribution
  SetCustomerVisitDistributionData = "SetCustomerVisitDistributionData",
  // Filter
  SetFilterData = "SetFilterData",
  SelectDate = "SelectDate",
  SelectResolution = "SelectResolution",
  SetOutletsData = "SetOutletsData",
  FilterByOutlet = "FilterByOutlet",

  // CustomerVisit
  SetCustomerVisitData = "SetCustomerVisitData",
  // CustomerRegistration
  SetCustomerRegistrationData = "SetCustomerRegistrationData",
  // Report Request
  SetReportRequestData = "SetReportRequestData",
}

// Action Collection Types
export type CustomerBusinessAnalyticsActions =
  | CustomerBusinessAnalyticsCustomerVisitDistributionActions
  | CustomerBusinessAnalyticsFilterActions
  | CustomerBusinessAnalyticsCustomerVisitActions
  | CustomerBusinessAnalyticsCustomerRegistrationActions
  | CustomerBusinessAnalyticsReportRequestActions;

// Action Collection Types consist of:
// CustomerVisitDistribution
type CustomerBusinessAnalyticsCustomerVisitDistributionPayload = {
  [CustomerBusinessAnalyticsActionEnum.SetCustomerVisitDistributionData]: ICustomerBusinessAnalyticsCustomerVisitDistribution;
};

export type CustomerBusinessAnalyticsCustomerVisitDistributionActions =
  ActionMap<CustomerBusinessAnalyticsCustomerVisitDistributionPayload>[keyof ActionMap<CustomerBusinessAnalyticsCustomerVisitDistributionPayload>];

// Filter
type CustomerBusinessAnalyticsFilterPayload = {
  [CustomerBusinessAnalyticsActionEnum.SetFilterData]: ICustomerBusinessAnalyticsFilter;
  [CustomerBusinessAnalyticsActionEnum.SelectDate]: {
    start_date: string;
    end_date: string;
  };
  [CustomerBusinessAnalyticsActionEnum.SelectResolution]: {
    id: string;
    name: string;
  };
  [CustomerBusinessAnalyticsActionEnum.SetOutletsData]: {
    id: string;
    name: string;
  }[];
  [CustomerBusinessAnalyticsActionEnum.FilterByOutlet]: {
    id: string;
    name: string;
  };
};

export type CustomerBusinessAnalyticsFilterActions =
  ActionMap<CustomerBusinessAnalyticsFilterPayload>[keyof ActionMap<CustomerBusinessAnalyticsFilterPayload>];

// CustomerVisit
type CustomerBusinessAnalyticsCustomerVisitPayload = {
  [CustomerBusinessAnalyticsActionEnum.SetCustomerVisitData]: ICustomerBusinessAnalyticsCustomerVisit;
};

export type CustomerBusinessAnalyticsCustomerVisitActions =
  ActionMap<CustomerBusinessAnalyticsCustomerVisitPayload>[keyof ActionMap<CustomerBusinessAnalyticsCustomerVisitPayload>];

// CustomerRegistration
type CustomerBusinessAnalyticsCustomerRegistrationPayload = {
  [CustomerBusinessAnalyticsActionEnum.SetCustomerRegistrationData]: ICustomerBusinessAnalyticsCustomerRegistration;
};

export type CustomerBusinessAnalyticsCustomerRegistrationActions =
  ActionMap<CustomerBusinessAnalyticsCustomerRegistrationPayload>[keyof ActionMap<CustomerBusinessAnalyticsCustomerRegistrationPayload>];

// Report Request
type CustomerBusinessAnalyticsReportRequestPayload = {
  [CustomerBusinessAnalyticsActionEnum.SetReportRequestData]: ICustomerBusinessAnalyticsReportRequest;
};

export type CustomerBusinessAnalyticsReportRequestActions =
  ActionMap<CustomerBusinessAnalyticsReportRequestPayload>[keyof ActionMap<CustomerBusinessAnalyticsReportRequestPayload>];
