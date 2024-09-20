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
export interface CustomerRecordInitialStateType {
  type: CustomerRecordType;
  comparison: CustomerRecordComparison;
  timeline: CustomerRecordTimeline;
  global: CustomerRecordGlobal;
  routine: CustomerRecordRoutine;
  spotlight: CustomerRecordSpotlight;
}

export interface CustomerRecordScan {
  id: number;
  image: string;
  region: string;
}

export interface CustomerRecordSelectedScan extends CustomerRecordScan {
  svc_time: string;
  svc_time_id: string;
}

// State Collection Types consist of:

export interface CustomerRecordType {
  selected: null | {
    id: string;
    name: string;
  };
}

export interface CustomerRecordComparison {
  data: CustomerRecordSelectedScan[];
}

export interface CustomerRecordTimeline {
  skip: number;
  data: {
    id: string;
    name: string;
  }[];
}

export interface CustomerRecordGlobal {
  scan: CustomerRecordScan[];
}

export interface CustomerRecordRoutine {
  scan: CustomerRecordScan[];
}

export interface CustomerRecordSpotlight {
  scan: CustomerRecordScan[];
}

export enum CustomerRecordActionEnum {
  // type
  SetTypeData = "SetTypeData",

  // selection
  SetSelectionValue = "SetSelectionValue",
  SelectScanToCompare = "SelectScanToCompare",

  // timeline
  SetTimelineData = "SetTimelineData",

  // global
  SetGlobalValue = "SetGlobalValue",
  // routine
  SetRoutineValue = "SetRoutineValue",

  // spotlight
  SetSpotlightValue = "SetSpotlightValue",
}

// Action Collection Types
export type CustomerRecordActions =
  | CustomerRecordTypeActions
  | CustomerRecordComparisonActions
  | CustomerRecordTimelineActions
  | CustomerRecordGlobalActions
  | CustomerRecordRoutineActions
  | CustomerRecordSpotlightActions;

// Action Collection Types consist of:

// type
type CustomerRecordTypePayload = {
  [CustomerRecordActionEnum.SetTypeData]: CustomerRecordType;
};

export type CustomerRecordTypeActions =
  ActionMap<CustomerRecordTypePayload>[keyof ActionMap<CustomerRecordTypePayload>];

// selection
type CustomerRecordComparisonPayload = {
  [CustomerRecordActionEnum.SetSelectionValue]: CustomerRecordComparison;
  [CustomerRecordActionEnum.SelectScanToCompare]: CustomerRecordSelectedScan[];
};

export type CustomerRecordComparisonActions =
  ActionMap<CustomerRecordComparisonPayload>[keyof ActionMap<CustomerRecordComparisonPayload>];

// timeline
type CustomerRecordTimelinePayload = {
  [CustomerRecordActionEnum.SetTimelineData]: CustomerRecordTimeline;
};

export type CustomerRecordTimelineActions =
  ActionMap<CustomerRecordTimelinePayload>[keyof ActionMap<CustomerRecordTimelinePayload>];

// global
type CustomerRecordGlobalPayload = {
  [CustomerRecordActionEnum.SetGlobalValue]: CustomerRecordGlobal;
};

export type CustomerRecordGlobalActions =
  ActionMap<CustomerRecordGlobalPayload>[keyof ActionMap<CustomerRecordGlobalPayload>];

// routine
type CustomerRecordRoutinePayload = {
  [CustomerRecordActionEnum.SetRoutineValue]: CustomerRecordRoutine;
};

export type CustomerRecordRoutineActions =
  ActionMap<CustomerRecordRoutinePayload>[keyof ActionMap<CustomerRecordRoutinePayload>];

// spotlight
type CustomerRecordSpotlightPayload = {
  [CustomerRecordActionEnum.SetSpotlightValue]: CustomerRecordSpotlight;
};

export type CustomerRecordSpotlightActions =
  ActionMap<CustomerRecordSpotlightPayload>[keyof ActionMap<CustomerRecordSpotlightPayload>];
