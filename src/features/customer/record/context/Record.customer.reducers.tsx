import {
  CustomerRecordActionEnum,
  CustomerRecordActions,
  CustomerRecordGlobal,
  CustomerRecordType,
  CustomerRecordRoutine,
  CustomerRecordComparison,
  CustomerRecordSpotlight,
  CustomerRecordTimeline,
} from "./Record.customer.types";

// type
export const CustomerRecordTypeReducer = (
  state: CustomerRecordType,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetTypeData:
      return action.payload;

    default:
      return state;
  }
};

// selection
export const CustomerRecordComparisonReducer = (
  state: CustomerRecordComparison,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetSelectionValue:
      return action.payload;
    case CustomerRecordActionEnum.SelectScanToCompare: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};

// timeline
export const CustomerRecordTimelineReducer = (
  state: CustomerRecordTimeline,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetTimelineData: {
      return action.payload;
    }

    default:
      return state;
  }
};
// global
export const CustomerRecordGlobalReducer = (
  state: CustomerRecordGlobal,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetGlobalValue:
      return action.payload;

    default:
      return state;
  }
};

// routine
export const CustomerRecordRoutineReducer = (
  state: CustomerRecordRoutine,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetRoutineValue:
      return action.payload;

    default:
      return state;
  }
};

// spotlight
export const CustomerRecordSpotlightReducer = (
  state: CustomerRecordSpotlight,
  action: CustomerRecordActions
) => {
  switch (action.type) {
    case CustomerRecordActionEnum.SetSpotlightValue:
      return action.payload;

    default:
      return state;
  }
};
