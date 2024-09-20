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
export interface CustomerComparisonInitialStateType {
  options: CustomerComparisonOptions;
  cases: CustomerComparisonCases;
  raw: CustomerComparisonRaw[];
  detail: CustomerComparisonDetail[];
  chart: CustomerComparisonChart[];
}

// State Collection Types consist of:
export interface CustomerComparisonOptions {
  selected?: null | { id: string; name: string };
}

export interface CustomerComparisonCases {
  data: {
    id: number;
    image_url: string;
    region: string;
    svc_time: string;
    screening: null | {
      [key: string]: {
        [key: string]: {
          name: string;
          unit: string;
          description: string;
          mapping_figure: string;
          value: number | { [key: string]: number };
        };
      };
    };
  }[];
}

export interface CustomerComparisonRaw {
  id: number;
  image: string;
  region: string;
}

export interface CustomerComparisonChart {
  id: number;
  icon: string;
  region: string;
  image: string;
  date: string;
  biometric: null | {
    hair_root_pigmentation: {
      name: string;
      data: {
        name: string;
        value: number;
      }[];
      description: string;
    };
    scalp_texture: {
      name: string;
      rating: number;
      description: string;
    };
    scalp_redness: {
      name: string;
      rating: number;
      description: string;
    };
    scalp_wrinkles: {
      name: string;
      rating: number;
      description: string;
    };
  };
}

export interface CustomerComparisonDetail {
  id: number;
  icon: string;
  region: string;
  date: string;
  image: string;
  data:
    | {
        name: string;
        value: string;
        description: string;
      }[]
    | null;
}

export enum CustomerComparisonActionEnum {
  // options
  SetOptionsValue = "SetOptionsValue",
  // cases
  SetCasesData = "SetCasesData",

  // old
  // raw
  SetRawValue = "SetRawValue",
  // chart
  SetChartValue = "SetChartValue",
  // detail
  SetDetailValue = "SetDetailValue",
}

// Action Collection Types
export type CustomerComparisonActions =
  | CustomerComparisonOptionsActions
  | CustomerComparisonCasesActions
  | CustomerComparisonRawActions
  | CustomerComparisonChartActions
  | CustomerComparisonDetailActions;

// Action Collection Types consist of:
// options
type CustomerComparisonOptionsPayload = {
  [CustomerComparisonActionEnum.SetOptionsValue]: CustomerComparisonOptions;
};

export type CustomerComparisonOptionsActions =
  ActionMap<CustomerComparisonOptionsPayload>[keyof ActionMap<CustomerComparisonOptionsPayload>];

// cases
type CustomerComparisonCasesPayload = {
  [CustomerComparisonActionEnum.SetCasesData]: CustomerComparisonCases;
};

export type CustomerComparisonCasesActions =
  ActionMap<CustomerComparisonCasesPayload>[keyof ActionMap<CustomerComparisonCasesPayload>];

// raw
type CustomerComparisonRawPayload = {
  [CustomerComparisonActionEnum.SetRawValue]: CustomerComparisonRaw[];
};

export type CustomerComparisonRawActions =
  ActionMap<CustomerComparisonRawPayload>[keyof ActionMap<CustomerComparisonRawPayload>];

// chart
type CustomerComparisonChartPayload = {
  [CustomerComparisonActionEnum.SetChartValue]: CustomerComparisonChart[];
};

export type CustomerComparisonChartActions =
  ActionMap<CustomerComparisonChartPayload>[keyof ActionMap<CustomerComparisonChartPayload>];

// detail
type CustomerComparisonDetailPayload = {
  [CustomerComparisonActionEnum.SetDetailValue]: CustomerComparisonDetail[];
};

export type CustomerComparisonDetailActions =
  ActionMap<CustomerComparisonDetailPayload>[keyof ActionMap<CustomerComparisonDetailPayload>];
