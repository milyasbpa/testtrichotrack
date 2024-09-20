import {
  CustomerComparisonOptions,
  CustomerComparisonRaw,
  CustomerComparisonChart,
  CustomerComparisonDetail,
  CustomerComparisonActionEnum,
  CustomerComparisonActions,
  CustomerComparisonCases,
} from "./Comparison.customer.types";

// options
export const CustomerComparisonOptionsReducer = (
  state: CustomerComparisonOptions,
  action: CustomerComparisonActions
) => {
  switch (action.type) {
    case CustomerComparisonActionEnum.SetOptionsValue:
      return action.payload;

    default:
      return state;
  }
};

// cases
export const CustomerComparisonCasesReducer = (
  state: CustomerComparisonCases,
  action: CustomerComparisonActions
) => {
  switch (action.type) {
    case CustomerComparisonActionEnum.SetCasesData:
      return action.payload;

    default:
      return state;
  }
};

// raw
export const CustomerComparisonRawReducer = (
  state: CustomerComparisonRaw[],
  action: CustomerComparisonActions
) => {
  switch (action.type) {
    case CustomerComparisonActionEnum.SetRawValue:
      return action.payload;

    default:
      return state;
  }
};

// chart
export const CustomerComparisonChartReducer = (
  state: CustomerComparisonChart[],
  action: CustomerComparisonActions
) => {
  switch (action.type) {
    case CustomerComparisonActionEnum.SetChartValue:
      return action.payload;

    default:
      return state;
  }
};

// detail
export const CustomerComparisonDetailReducer = (
  state: CustomerComparisonDetail[],
  action: CustomerComparisonActions
) => {
  switch (action.type) {
    case CustomerComparisonActionEnum.SetDetailValue:
      return action.payload;

    default:
      return state;
  }
};
