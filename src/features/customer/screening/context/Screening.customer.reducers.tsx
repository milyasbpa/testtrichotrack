import {
  CustomerScreeningAnnotations,
  CustomerScreeningScan,
  CustomerScreeningActionEnum,
  CustomerScreeningActions,
  CustomerScreeningGroup,
  CustomerScreeningScreening,
} from "./Screening.customer.types";

// Scan
export const CustomerScreeningScanReducer = (
  state: CustomerScreeningScan,
  action: CustomerScreeningActions
) => {
  switch (action.type) {
    case CustomerScreeningActionEnum.SetScanValue:
      return action.payload;

    default:
      return state;
  }
};

// Group
export const CustomerScreeningGroupReducer = (
  state: CustomerScreeningGroup,
  action: CustomerScreeningActions
) => {
  switch (action.type) {
    case CustomerScreeningActionEnum.SetGroupData:
      return action.payload;

    default:
      return state;
  }
};

// Annotations
export const CustomerScreeningAnnotationsReducer = (
  state: CustomerScreeningAnnotations,
  action: CustomerScreeningActions
) => {
  switch (action.type) {
    case CustomerScreeningActionEnum.SetAnnotationsValue:
      return action.payload;

    default:
      return state;
  }
};

// Screening
export const CustomerScreeningScreeningReducer = (
  state: CustomerScreeningScreening,
  action: CustomerScreeningActions
) => {
  switch (action.type) {
    case CustomerScreeningActionEnum.SetScreeningData:
      return action.payload;

    default:
      return state;
  }
};
