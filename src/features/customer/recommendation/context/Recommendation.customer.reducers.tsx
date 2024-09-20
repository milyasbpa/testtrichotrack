import {
  CustomerRecommendationRecord,
  CustomerRecommendationActionEnum,
  CustomerRecommendationActions,
  CustomerRecommendationOverall,
} from "./Recommendation.customer.types";

// Overall
export const CustomerRecommendationOverallReducer = (
  state: CustomerRecommendationOverall,
  action: CustomerRecommendationActions
) => {
  switch (action.type) {
    case CustomerRecommendationActionEnum.SetOverallData: {
      return action.payload;
    }

    default:
      return state;
  }
};

// Treatment
export const CustomerRecommendationRecordReducer = (
  state: CustomerRecommendationRecord,
  action: CustomerRecommendationActions
) => {
  switch (action.type) {
    case CustomerRecommendationActionEnum.SetRecordValue: {
      return action.payload;
    }
    case CustomerRecommendationActionEnum.SelectRecordID: {
      return {
        ...state,
        id: action.payload,
      };
    }

    default:
      return state;
  }
};
