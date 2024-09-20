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
export interface CustomerIssueInitialStateType {
  overview: CustomerIssueOverview;
  detail: CustomerIssueDetail;
  rating: CustomerIssueRating;
  level_info: CustomerIssueLevelInfo;
  recommendations: CustomerIssueRecommendations;
}

// State Collection Types consist of:

export interface CustomerIssueOverview {
  data: null | {
    name: string;
    rating: number;
    level: string;
  };
}

export interface CustomerIssueDetail {
  id: number;
  name: string;
  photo: string;
  introduction: {
    name: string;
    description: string;
  };
  prevalence: {
    name: string;
    description: string;
  };
  symptoms: {
    name: string;
    description: string;
  };
  causes: {
    name: string;
    description: string;
  };
  prevention: {
    name: string;
    description: string;
  };
}

export interface CustomerIssueRating {
  data: {
    description: string;
    factors: {
      factor: string;
      name: string;
      description: string;
      value: number;
      mapping_figure: string;
      evidences: {
        scan_id: number;
        value: number;
        region: string;
        image: string;
        svc_time: string;
      }[];
    }[];
  };
}

export interface CustomerIssueLevelInfo {
  data: null | {
    description: string;
    level: string;
    examples: string[];
  };
  selected: null | {
    id: string;
    name: string;
  };
}

export interface CustomerIssueRecommendations {
  issue: string;
  category: string;
  management_tips: {
    name: string;
    description: string;
  };
  stage: {
    value: number | null;
  };
  treatment_type: {
    selected: number | null;
    list: string[];
  };

  care_plans: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];

  home_cares: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
}

export enum CustomerIssueActionEnum {
  // overview
  SetOverviewValue = "SetOverviewValue",
  // rating
  SetRatingValue = "SetRatingValue",
  // level_info
  SetLevelInfoValue = "SetLevelInfoValue",
  // detail
  SetDetailValue = "SetDetailValue",
  // recommendations
  SetRecommendationsValue = "SetRecommendationsValue",
  SetRecommendationsManagementTips = "SetRecommendationsManagementTips",
  SetRecommendationStageValue = "SetRecommendationStageValue",
  SelectRecommendationTreatment = "SelectRecommendationTreatment",
  SetRecommendationCarePlansValue = "SetRecommendationCarePlansValue",
  SetRecommendationHomeCaresValue = "SetRecommendationHomeCaresValue",
}

// Action Collection Types
export type CustomerIssueActions =
  | CustomerIssueOverviewActions
  | CustomerIssueRatingActions
  | CustomerIssueLevelInfoActions
  | CustomerIssueDetailActions
  | CustomerIssueRecommendationsActions;

// Action Collection Types consist of:

// overview
type CustomerIssueOverviewPayload = {
  [CustomerIssueActionEnum.SetOverviewValue]: CustomerIssueOverview;
};

export type CustomerIssueOverviewActions =
  ActionMap<CustomerIssueOverviewPayload>[keyof ActionMap<CustomerIssueOverviewPayload>];

// detail
type CustomerIssueDetailPayload = {
  [CustomerIssueActionEnum.SetDetailValue]: CustomerIssueDetail;
};

export type CustomerIssueDetailActions =
  ActionMap<CustomerIssueDetailPayload>[keyof ActionMap<CustomerIssueDetailPayload>];

// level_info
type CustomerIssueLevelInfoPayload = {
  [CustomerIssueActionEnum.SetLevelInfoValue]: CustomerIssueLevelInfo;
};

export type CustomerIssueLevelInfoActions =
  ActionMap<CustomerIssueLevelInfoPayload>[keyof ActionMap<CustomerIssueLevelInfoPayload>];

// rating
type CustomerIssueRatingPayload = {
  [CustomerIssueActionEnum.SetRatingValue]: CustomerIssueRating;
};

export type CustomerIssueRatingActions =
  ActionMap<CustomerIssueRatingPayload>[keyof ActionMap<CustomerIssueRatingPayload>];

// recommendations
type CustomerIssueRecommendationsPayload = {
  [CustomerIssueActionEnum.SetRecommendationsValue]: CustomerIssueRecommendations;
  [CustomerIssueActionEnum.SetRecommendationsManagementTips]: {
    name: string;
    description: string;
  };
  [CustomerIssueActionEnum.SetRecommendationStageValue]: number | null;
  [CustomerIssueActionEnum.SelectRecommendationTreatment]: number | null;
  [CustomerIssueActionEnum.SetRecommendationCarePlansValue]: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
  [CustomerIssueActionEnum.SetRecommendationHomeCaresValue]: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
};

export type CustomerIssueRecommendationsActions =
  ActionMap<CustomerIssueRecommendationsPayload>[keyof ActionMap<CustomerIssueRecommendationsPayload>];
