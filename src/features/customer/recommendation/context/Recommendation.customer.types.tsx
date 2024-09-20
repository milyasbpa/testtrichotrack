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
export interface CustomerRecommendationInitialStateType {
  // new
  overall: CustomerRecommendationOverall;
  record: CustomerRecommendationRecord;
}

// State Collection Types consist of:
export interface CustomerRecommendationOverall {
  data: {
    issue: string;
    name: string;
    stages: {
      name: string;
      careplans: {
        id: number;
        name: string;
        description: string;
        photo: string;
      }[];
      homecares: {
        id: number;
        name: string;
        description: string;
        photo: string;
      }[];
      description: string;
    }[];
  }[];
}
export interface CustomerRecommendationRecord {
  id: number;
  list: string[];
}

export enum CustomerRecommendationActionEnum {
  // new
  // Overall
  SetOverallData = "SetOverallData",
  // old
  // Record
  SetRecordValue = "SetRecordValue",
  SelectRecordID = "SelectActiveRecord",
}

// Action Collection Types
export type CustomerRecommendationActions =
  | CustomerRecommendationOverallActions
  | CustomerRecommendationRecordActions;

// Action Collection Types consist of:
// overall
type CustomerRecommendationOverallPayload = {
  [CustomerRecommendationActionEnum.SetOverallData]: CustomerRecommendationOverall;
};

export type CustomerRecommendationOverallActions =
  ActionMap<CustomerRecommendationOverallPayload>[keyof ActionMap<CustomerRecommendationOverallPayload>];

// record
type CustomerRecommendationRecordPayload = {
  [CustomerRecommendationActionEnum.SetRecordValue]: CustomerRecommendationRecord;
  [CustomerRecommendationActionEnum.SelectRecordID]: number;
};

export type CustomerRecommendationRecordActions =
  ActionMap<CustomerRecommendationRecordPayload>[keyof ActionMap<CustomerRecommendationRecordPayload>];
