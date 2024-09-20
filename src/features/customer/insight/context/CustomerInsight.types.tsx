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
export interface CustomerInsightInitialStateType {
  filter: CustomerInsightFilter;
  rating: CustomerInsightRating;
}

// State Collection Types consist of:
// Filter
export interface CustomerInsightFilter {
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
}

// Age
export interface CustomerInsightRating {
  [key: string]: {
    raw_data: number[];
    labels: string[];
    data: number[][];
  };
}

export enum CustomerInsightActionEnum {
  // Filter
  SetFilterData = "SetFilterData",

  // Rating
  SetRatingData = "SetRatingData",
}

// Action Collection Types
export type CustomerInsightActions =
  | CustomerInsightFilterActions
  | CustomerInsightRatingActions;

// Action Collection Types consist of:
// Filter
type CustomerInsightFilterPayload = {
  [CustomerInsightActionEnum.SetFilterData]: CustomerInsightFilter;
};

export type CustomerInsightFilterActions =
  ActionMap<CustomerInsightFilterPayload>[keyof ActionMap<CustomerInsightFilterPayload>];

// Rating
type CustomerInsightRatingPayload = {
  [CustomerInsightActionEnum.SetRatingData]: CustomerInsightRating;
};

export type CustomerInsightRatingActions =
  ActionMap<CustomerInsightRatingPayload>[keyof ActionMap<CustomerInsightRatingPayload>];
