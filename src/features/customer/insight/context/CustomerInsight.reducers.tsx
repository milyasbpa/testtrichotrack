import {
  CustomerInsightActionEnum,
  CustomerInsightActions,
  CustomerInsightRating,
  CustomerInsightFilter,
} from "./CustomerInsight.types";

// Filter
export const CustomerInsightFilterReducer = (
  state: CustomerInsightFilter,
  action: CustomerInsightActions
) => {
  switch (action.type) {
    case CustomerInsightActionEnum.SetFilterData:
      return action.payload;

    default:
      return state;
  }
};

// Race
export const CustomerInsightRatingReducer = (
  state: CustomerInsightRating,
  action: CustomerInsightActions
) => {
  switch (action.type) {
    case CustomerInsightActionEnum.SetRatingData:
      return action.payload;

    default:
      return state;
  }
};
