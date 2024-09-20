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
export interface CustomerScreeningInitialStateType {
  scan: CustomerScreeningScan;
  group: CustomerScreeningGroup;
  annotations: CustomerScreeningAnnotations;
  screening: CustomerScreeningScreening;
}

// State Collection Types consist of:

export interface CustomerScreeningScan {
  region: string;
  id: number;
  svc_time: string;
  image: string;
}

export interface CustomerScreeningGroup {
  selected: null | { id: string; name: string };
}

export interface CustomerScreeningAnnotations {
  hair: {
    data: {
      boundary: number[][];
    }[];
  };
  pimple: {
    data: {
      boundary: number[][];
    }[];
  };
  follicle: {
    data: {
      pigmentation: string;
      miniaturization: boolean;
      capacity: number;
      center: number[];
    }[];
  };
  dandruff: {
    data: {
      boundary: number[][];
    }[];
  };
}

export interface CustomerScreeningScreening {
  data: null | {
    [key: string]: {
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
  };
}

export enum CustomerScreeningActionEnum {
  // scan
  SetScanValue = "SetScanValue",
  // group
  SetGroupData = "SetGroupData",
  // annotations
  SetAnnotationsValue = "SetAnnotationsValue",
  // screening
  SetScreeningData = "SetScreeningData",
}

// Action Collection Types
export type CustomerScreeningActions =
  | CustomerScreeningScanActions
  | CustomerScreeningGroupActions
  | CustomerScreeningAnnotationsActions
  | CustomerScreeningScreeningActions;

// Action Collection Types consist of:

// scan
type CustomerScreeningScanPayload = {
  [CustomerScreeningActionEnum.SetScanValue]: CustomerScreeningScan;
};

export type CustomerScreeningScanActions =
  ActionMap<CustomerScreeningScanPayload>[keyof ActionMap<CustomerScreeningScanPayload>];

// group
type CustomerScreeningGroupPayload = {
  [CustomerScreeningActionEnum.SetGroupData]: CustomerScreeningGroup;
};

export type CustomerScreeningGroupActions =
  ActionMap<CustomerScreeningGroupPayload>[keyof ActionMap<CustomerScreeningGroupPayload>];

// annotations
type CustomerScreeningAnnotationsPayload = {
  [CustomerScreeningActionEnum.SetAnnotationsValue]: CustomerScreeningAnnotations;
};

export type CustomerScreeningAnnotationsActions =
  ActionMap<CustomerScreeningAnnotationsPayload>[keyof ActionMap<CustomerScreeningAnnotationsPayload>];

// screening
type CustomerScreeningScreeningPayload = {
  [CustomerScreeningActionEnum.SetScreeningData]: CustomerScreeningScreening;
};

export type CustomerScreeningScreeningActions =
  ActionMap<CustomerScreeningScreeningPayload>[keyof ActionMap<CustomerScreeningScreeningPayload>];
