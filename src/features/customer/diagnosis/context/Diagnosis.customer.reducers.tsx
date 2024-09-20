import {
  CustomerDiagnosisActionEnum,
  CustomerDiagnosisActions,
  CustomerDiagnosisOverview,
  CustomerDiagnosisScreening,
  CustomerDiagnosisTrends,
  CustomerDiagnosisTimeline,
  CustomerDiagnosisType,
} from "./Diagnosis.customer.types";

// Type
export const CustomerDiagnosisTypeReducer = (
  state: CustomerDiagnosisType,
  action: CustomerDiagnosisActions
) => {
  switch (action.type) {
    case CustomerDiagnosisActionEnum.SetTypeData:
      return action.payload;

    default:
      return state;
  }
};

// Timeline
export const CustomerDiagnosisTimelineReducer = (
  state: CustomerDiagnosisTimeline,
  action: CustomerDiagnosisActions
) => {
  switch (action.type) {
    case CustomerDiagnosisActionEnum.SetTimelineData:
      return action.payload;

    default:
      return state;
  }
};

// overview
export const CustomerDiagnosisOverviewReducer = (
  state: CustomerDiagnosisOverview,
  action: CustomerDiagnosisActions
) => {
  switch (action.type) {
    case CustomerDiagnosisActionEnum.SetOverviewValue:
      return action.payload;

    default:
      return state;
  }
};

// Screening
export const CustomerDiagnosisScreeningReducer = (
  state: CustomerDiagnosisScreening,
  action: CustomerDiagnosisActions
) => {
  switch (action.type) {
    case CustomerDiagnosisActionEnum.SetScreeningValue:
      return action.payload;

    default:
      return state;
  }
};

// trend
export const CustomerDiagnosisTrendsReducer = (
  state: CustomerDiagnosisTrends,
  action: CustomerDiagnosisActions
) => {
  switch (action.type) {
    case CustomerDiagnosisActionEnum.SetTrendValue:
      return action.payload;

    default:
      return state;
  }
};
