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
export interface CustomerInactiveInitialStateType {
  threshold: ICustomerInactiveThreshold;
  section: ICustomerInactiveSection;
  rating: ICustomerInactiveRating;
  gender: ICustomerInactiveGender;
  race: ICustomerInactiveRace;
  age: ICustomerInactiveAge;
}

// State Collection Types consist of:
// Threshold
export interface ICustomerInactiveThreshold {
  visit_number: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
}
// section
export interface ICustomerInactiveSection {
  tab: {
    selected: {
      id: string;
      name: string;
    } | null;
  };
}

// Rating
export interface ICustomerInactiveRating {
  filter: {
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
    gender: {
      selected: {
        id: string;
        name: string;
      } | null;
    };
    race: {
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
  };
  chart: {
    [key: string]: {
      raw_data: number[];
      labels: string[];
      data: number[][];
    };
  };
}

// Gender
export interface ICustomerInactiveGender {
  labels: string[];
  data: number[];
}

// Race
export interface ICustomerInactiveRace {
  labels: string[];
  data: number[];
}

// Age
export interface ICustomerInactiveAge {
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

export enum CustomerInactiveActionEnum {
  // Threshold
  SetThresholdData = "SetThresholdData",
  SelectVisitNumber = "SelectVisitNumber",

  // Section
  SetSectionData = "SetSectionData",
  SelectTabSection = "SelectTabSection",

  // Rating
  SetRatingData = "SetRatingData",
  SetRatingChartData = "SetRatingChartData",
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
export type CustomerInactiveActions =
  | CustomerInactiveThresholdActions
  | CustomerInactiveSectionActions
  | CustomerInactiveRatingActions
  | CustomerInactiveGenderActions
  | CustomerInactiveRaceActions
  | CustomerInactiveAgeActions;

// Action Collection Types consist of:
// Threshold
type CustomerInactiveThresholdPayload = {
  [CustomerInactiveActionEnum.SetThresholdData]: ICustomerInactiveThreshold;
  [CustomerInactiveActionEnum.SelectVisitNumber]: {
    id: string;
    name: string;
  };
};

export type CustomerInactiveThresholdActions =
  ActionMap<CustomerInactiveThresholdPayload>[keyof ActionMap<CustomerInactiveThresholdPayload>];

// Section
type CustomerInactiveSectionPayload = {
  [CustomerInactiveActionEnum.SetSectionData]: ICustomerInactiveSection;
  [CustomerInactiveActionEnum.SelectTabSection]: {
    id: string;
    name: string;
  } | null;
};

export type CustomerInactiveSectionActions =
  ActionMap<CustomerInactiveSectionPayload>[keyof ActionMap<CustomerInactiveSectionPayload>];

// Rating
type CustomerInactiveRatingPayload = {
  [CustomerInactiveActionEnum.SetRatingData]: ICustomerInactiveRating;
  [CustomerInactiveActionEnum.SetRatingChartData]: {
    [key: string]: {
      raw_data: number[];
      labels: string[];
      data: number[][];
    };
  };
};

export type CustomerInactiveRatingActions =
  ActionMap<CustomerInactiveRatingPayload>[keyof ActionMap<CustomerInactiveRatingPayload>];

// Gender
type CustomerInactiveGenderPayload = {
  [CustomerInactiveActionEnum.SetGenderData]: ICustomerInactiveGender;
};

export type CustomerInactiveGenderActions =
  ActionMap<CustomerInactiveGenderPayload>[keyof ActionMap<CustomerInactiveGenderPayload>];

// Race
type CustomerInactiveRacePayload = {
  [CustomerInactiveActionEnum.SetRaceData]: ICustomerInactiveRace;
};

export type CustomerInactiveRaceActions =
  ActionMap<CustomerInactiveRacePayload>[keyof ActionMap<CustomerInactiveRacePayload>];

// Age
type CustomerInactiveAgePayload = {
  [CustomerInactiveActionEnum.SetAgeData]: ICustomerInactiveAge;
  [CustomerInactiveActionEnum.SelectStartAge]: {
    id: string;
    name: string;
  };
  [CustomerInactiveActionEnum.SelectEndAge]: {
    id: string;
    name: string;
  };
  [CustomerInactiveActionEnum.SelectAgeResolution]: {
    id: string;
    name: string;
  };
  [CustomerInactiveActionEnum.SelectGender]: {
    id: string;
    name: string;
  };
};

export type CustomerInactiveAgeActions =
  ActionMap<CustomerInactiveAgePayload>[keyof ActionMap<CustomerInactiveAgePayload>];
