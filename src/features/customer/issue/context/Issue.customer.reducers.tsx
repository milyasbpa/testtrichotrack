import {
  CustomerIssueOverview,
  CustomerIssueDetail,
  CustomerIssueActionEnum,
  CustomerIssueActions,
  CustomerIssueRating,
  CustomerIssueRecommendations,
  CustomerIssueLevelInfo,
} from "./Issue.customer.types";

// overview
export const CustomerIssueOverviewReducer = (
  state: CustomerIssueOverview,
  action: CustomerIssueActions
) => {
  switch (action.type) {
    case CustomerIssueActionEnum.SetOverviewValue:
      return action.payload;

    default:
      return state;
  }
};

// detail
export const CustomerIssueDetailReducer = (
  state: CustomerIssueDetail,
  action: CustomerIssueActions
) => {
  switch (action.type) {
    case CustomerIssueActionEnum.SetDetailValue:
      return action.payload;

    default:
      return state;
  }
};

// level_info
export const CustomerIssueLevelInfoReducer = (
  state: CustomerIssueLevelInfo,
  action: CustomerIssueActions
) => {
  switch (action.type) {
    case CustomerIssueActionEnum.SetLevelInfoValue:
      return action.payload;

    default:
      return state;
  }
};

// factors
export const CustomerIssueRatingReducer = (
  state: CustomerIssueRating,
  action: CustomerIssueActions
) => {
  switch (action.type) {
    case CustomerIssueActionEnum.SetRatingValue:
      return action.payload;

    default:
      return state;
  }
};

// recommendations
export const CustomerIssueRecommendationsReducer = (
  state: CustomerIssueRecommendations,
  action: CustomerIssueActions
) => {
  switch (action.type) {
    case CustomerIssueActionEnum.SetRecommendationsValue:
      return action.payload;
    case CustomerIssueActionEnum.SetRecommendationsManagementTips:
      return {
        ...state,
        management_tips: {
          ...state.management_tips,
          name: action.payload.name,
          description: action.payload.description,
        },
      };
    case CustomerIssueActionEnum.SetRecommendationStageValue: {
      return {
        ...state,
        stage: {
          ...state.stage,
          value: action.payload,
        },
      };
    }
    case CustomerIssueActionEnum.SelectRecommendationTreatment: {
      return {
        ...state,
        treatment_type: {
          ...state.treatment_type,
          selected: action.payload,
        },
      };
    }
    case CustomerIssueActionEnum.SetRecommendationCarePlansValue: {
      return {
        ...state,
        care_plans: action.payload,
      };
    }
    case CustomerIssueActionEnum.SetRecommendationHomeCaresValue: {
      return {
        ...state,
        home_cares: action.payload,
      };
    }

    default:
      return state;
  }
};
