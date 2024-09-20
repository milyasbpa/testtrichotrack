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
export interface CustomerDiagnosisInitialStateType {
  type: CustomerDiagnosisType;
  timeline: CustomerDiagnosisTimeline;
  overview: CustomerDiagnosisOverview;
  screening: CustomerDiagnosisScreening;
  trends: CustomerDiagnosisTrends;
}

// State Collection Types consist of:

export interface CustomerDiagnosisType {
  selected: {
    id: string;
    name: string;
  } | null;
}
export interface CustomerDiagnosisTimeline {
  skip: number;
  selected: {
    id: string;
    name: string;
  } | null;
  data: {
    id: string;
    name: string;
  }[];
}
export interface CustomerDiagnosisOverview {
  data: null | {
    [key: string]: {
      name: string;
      rating: number;
      level: string;
    };
  };
}

export interface CustomerDiagnosisScreening {
  data: null | {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value:
        | number
        | {
            [key: string]: number;
          };
    };
  };
}

export interface CustomerDiagnosisTrends {
  data: {
    svc_time: string;
    overview: {
      [key: string]: number;
    };
  }[];
}

export enum CustomerDiagnosisActionEnum {
  // type
  SetTypeData = "SetTypeData",

  // timeline
  SetTimelineData = "SetTimelineData",

  // overview
  SetOverviewValue = "SetOverviewValue",
  // Screening
  SetScreeningValue = "SetScreeningValue",
  // trend
  SetTrendValue = "SetTrendValue",
}

// Action Collection Types
export type CustomerDiagnosisActions =
  | CustomerDiagnosisTypeActions
  | CustomerDiagnosisTimelineActions
  | CustomerDiagnosisOverviewActions
  | CustomerDiagnosisScreeningActions
  | CustomerDiagnosisTrendsActions;

// Action Collection Types consist of:

// Type
type CustomerDiagnosisTypePayload = {
  [CustomerDiagnosisActionEnum.SetTypeData]: CustomerDiagnosisType;
};

export type CustomerDiagnosisTypeActions =
  ActionMap<CustomerDiagnosisTypePayload>[keyof ActionMap<CustomerDiagnosisTypePayload>];

// Timeline
type CustomerDiagnosisTimelinePayload = {
  [CustomerDiagnosisActionEnum.SetTimelineData]: CustomerDiagnosisTimeline;
};

export type CustomerDiagnosisTimelineActions =
  ActionMap<CustomerDiagnosisTimelinePayload>[keyof ActionMap<CustomerDiagnosisTimelinePayload>];

// Overview
type CustomerDiagnosisOverviewPayload = {
  [CustomerDiagnosisActionEnum.SetOverviewValue]: CustomerDiagnosisOverview;
};

export type CustomerDiagnosisOverviewActions =
  ActionMap<CustomerDiagnosisOverviewPayload>[keyof ActionMap<CustomerDiagnosisOverviewPayload>];

// Screening
type CustomerDiagnosisScreeningPayload = {
  [CustomerDiagnosisActionEnum.SetScreeningValue]: CustomerDiagnosisScreening;
};

export type CustomerDiagnosisScreeningActions =
  ActionMap<CustomerDiagnosisScreeningPayload>[keyof ActionMap<CustomerDiagnosisScreeningPayload>];

// Trend
type CustomerDiagnosisTrendsPayload = {
  [CustomerDiagnosisActionEnum.SetTrendValue]: CustomerDiagnosisTrends;
};

export type CustomerDiagnosisTrendsActions =
  ActionMap<CustomerDiagnosisTrendsPayload>[keyof ActionMap<CustomerDiagnosisTrendsPayload>];
