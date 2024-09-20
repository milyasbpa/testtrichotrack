import { createNewBarChartData, createNewBarChartLabels } from "../utils";
import {
  ICustomerInactiveGender,
  CustomerInactiveActionEnum,
  CustomerInactiveActions,
  ICustomerInactiveRace,
  ICustomerInactiveAge,
  ICustomerInactiveThreshold,
  ICustomerInactiveSection,
  ICustomerInactiveRating,
} from "./CustomerInactive.types";

// Threshold
export const CustomerInactiveThresholdReducer = (
  state: ICustomerInactiveThreshold,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetThresholdData:
      return action.payload;
    case CustomerInactiveActionEnum.SelectVisitNumber: {
      return {
        ...state,
        visit_number: {
          ...state.visit_number,
          selected: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

// Section
export const CustomerInactiveSectionReducer = (
  state: ICustomerInactiveSection,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetSectionData:
      return action.payload;
    case CustomerInactiveActionEnum.SelectTabSection:
      return {
        ...state,
        tab: {
          ...state.tab,
          selected: action.payload,
        },
      };

    default:
      return state;
  }
};

// Section
export const CustomerInactiveRatingReducer = (
  state: ICustomerInactiveRating,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetRatingData:
      return action.payload;
    case CustomerInactiveActionEnum.SetRatingChartData:
      return {
        ...state,
        chart: action.payload,
      };

    default:
      return state;
  }
};

// Gender
export const CustomerInactiveGenderReducer = (
  state: ICustomerInactiveGender,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetGenderData:
      return action.payload;

    default:
      return state;
  }
};

// Race
export const CustomerInactiveRaceReducer = (
  state: ICustomerInactiveRace,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetRaceData:
      return action.payload;

    default:
      return state;
  }
};

// Race
export const CustomerInactiveAgeReducer = (
  state: ICustomerInactiveAge,
  action: CustomerInactiveActions
) => {
  switch (action.type) {
    case CustomerInactiveActionEnum.SetAgeData:
      return action.payload;
    case CustomerInactiveActionEnum.SelectStartAge: {
      const rawData = state.raw_data;
      const startAge = parseInt(action.payload.id ?? "30");
      const endAge = parseInt(state.end_age.selected?.id ?? "40");
      const resolution = parseInt(state.resolution.selected?.id ?? "1");
      const startNumber = 1;
      const dataLength = endAge - startAge + startNumber;

      const availableSlot =
        dataLength % resolution === 0
          ? dataLength / resolution
          : Math.ceil(dataLength / resolution);

      const finalData = createNewBarChartData(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      const finalLabels = createNewBarChartLabels(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      return {
        ...state,
        start_age: {
          ...state.start_age,
          selected: action.payload,
        },
        labels: finalLabels,
        data: finalData,
        available_slot: availableSlot,
      };
    }
    case CustomerInactiveActionEnum.SelectEndAge: {
      const rawData = state.raw_data;
      const startAge = parseInt(state.start_age.selected?.id ?? "30");
      const endAge = parseInt(action.payload.id ?? "40");
      const resolution = parseInt(state.resolution.selected?.id ?? "1");
      const startNumber = 1;
      const dataLength = endAge - startAge + startNumber;

      const availableSlot =
        dataLength % resolution === 0
          ? dataLength / resolution
          : Math.ceil(dataLength / resolution);

      const finalData = createNewBarChartData(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      const finalLabels = createNewBarChartLabels(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );
      return {
        ...state,
        end_age: {
          ...state.end_age,
          selected: action.payload,
        },
        labels: finalLabels,
        data: finalData,
        available_slot: availableSlot,
      };
    }
    case CustomerInactiveActionEnum.SelectAgeResolution: {
      const rawData = state.raw_data;
      const startAge = parseInt(state.start_age.selected?.id ?? "30");
      const endAge = parseInt(state.end_age.selected?.id ?? "40");
      const resolution = parseInt(action.payload.id ?? "1");
      const startNumber = 1;
      const dataLength = endAge - startAge + startNumber;

      const availableSlot =
        dataLength % resolution === 0
          ? dataLength / resolution
          : Math.ceil(dataLength / resolution);

      const finalData = createNewBarChartData(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      const finalLabels = createNewBarChartLabels(
        rawData,
        availableSlot,
        resolution,
        startAge,
        endAge
      );

      return {
        ...state,
        resolution: {
          ...state.resolution,
          selected: action.payload,
        },
        data: finalData,
        labels: finalLabels,
        available_slot: availableSlot,
      };
    }

    case CustomerInactiveActionEnum.SelectGender: {
      return {
        ...state,
        gender: {
          ...state.resolution,
          selected: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
