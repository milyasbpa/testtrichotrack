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
export interface CustomerStatisticsInitialStateType {
  gender: ICustomerStatisticsGender;
  race: ICustomerStatisticsRace;
  age: ICustomerStatisticsAge;
}

// State Collection Types consist of:
// Gender
export interface ICustomerStatisticsGender {
  labels: string[];
  data: number[];
}

// Race
export interface ICustomerStatisticsRace {
  labels: string[];
  data: number[];
}

// Age
export interface ICustomerStatisticsAge {
  raw_data: number[][];
  start_age: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
  end_age: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
  resolution: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
  gender: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
  available_slot: number;
  labels: string[];
  data: number[];
}

export enum CustomerStatisticsActionEnum {
  // Gender
  SetGenderData = "SetGenderData",
  // Race
  SetRaceData = "SetRaceData",
  // Age
  SetAgeData = "SetAgeData",
  SelectStartAge = "SelectStartAge",
  SelectEndAge = "SelectEndAge",
  SelectAgeResolution = "SelectAgeResolution",
  SelectGender = "SelectGender",
}

// Action Collection Types
export type CustomerStatisticsActions =
  | CustomerStatisticsGenderActions
  | CustomerStatisticsRaceActions
  | CustomerStatisticsAgeActions;

// Action Collection Types consist of:
// Gender
type CustomerStatisticsGenderPayload = {
  [CustomerStatisticsActionEnum.SetGenderData]: ICustomerStatisticsGender;
};

export type CustomerStatisticsGenderActions =
  ActionMap<CustomerStatisticsGenderPayload>[keyof ActionMap<CustomerStatisticsGenderPayload>];

// Race
type CustomerStatisticsRacePayload = {
  [CustomerStatisticsActionEnum.SetRaceData]: ICustomerStatisticsRace;
};

export type CustomerStatisticsRaceActions =
  ActionMap<CustomerStatisticsRacePayload>[keyof ActionMap<CustomerStatisticsRacePayload>];

// Age
type CustomerStatisticsAgePayload = {
  [CustomerStatisticsActionEnum.SetAgeData]: ICustomerStatisticsAge;
  [CustomerStatisticsActionEnum.SelectStartAge]: {
    id: string;
    name: string;
  } | null;
  [CustomerStatisticsActionEnum.SelectEndAge]: {
    id: string;
    name: string;
  } | null;
  [CustomerStatisticsActionEnum.SelectAgeResolution]: {
    id: string;
    name: string;
  } | null;
  [CustomerStatisticsActionEnum.SelectGender]: {
    id: string;
    name: string;
  } | null;
};

export type CustomerStatisticsAgeActions =
  ActionMap<CustomerStatisticsAgePayload>[keyof ActionMap<CustomerStatisticsAgePayload>];
