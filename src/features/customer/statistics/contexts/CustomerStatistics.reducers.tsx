import { createNewBarChartData, createNewBarChartLabels } from "../utils";
import {
  ICustomerStatisticsGender,
  CustomerStatisticsActionEnum,
  CustomerStatisticsActions,
  ICustomerStatisticsRace,
  ICustomerStatisticsAge,
} from "./CustomerStatistics.types";

// Gender
export const CustomerStatisticsGenderReducer = (
  state: ICustomerStatisticsGender,
  action: CustomerStatisticsActions
) => {
  switch (action.type) {
    case CustomerStatisticsActionEnum.SetGenderData:
      return action.payload;

    default:
      return state;
  }
};

// Race
export const CustomerStatisticsRaceReducer = (
  state: ICustomerStatisticsRace,
  action: CustomerStatisticsActions
) => {
  switch (action.type) {
    case CustomerStatisticsActionEnum.SetRaceData:
      return action.payload;

    default:
      return state;
  }
};

// Race
export const CustomerStatisticsAgeReducer = (
  state: ICustomerStatisticsAge,
  action: CustomerStatisticsActions
) => {
  switch (action.type) {
    case CustomerStatisticsActionEnum.SetAgeData:
      return action.payload;
    case CustomerStatisticsActionEnum.SelectStartAge: {
      const rawData = state.raw_data;
      const startAge = parseInt(action.payload?.id ?? "1");
      const endAge = parseInt(state.end_age.selected?.id ?? "100");
      const resolution = parseInt(state.resolution.selected?.id ?? "10");
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
    case CustomerStatisticsActionEnum.SelectEndAge: {
      const rawData = state.raw_data;
      const startAge = parseInt(state.start_age.selected?.id ?? "1");
      const endAge = parseInt(action.payload?.id ?? "100");
      const resolution = parseInt(state.resolution.selected?.id ?? "10");
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
    case CustomerStatisticsActionEnum.SelectAgeResolution: {
      const rawData = state.raw_data;
      const startAge = parseInt(state.start_age.selected?.id ?? "1");
      const endAge = parseInt(state.end_age.selected?.id ?? "100");
      const resolution = parseInt(action.payload?.id ?? "10");
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

    case CustomerStatisticsActionEnum.SelectGender: {
      return {
        ...state,
        gender: {
          ...state.resolution,
          selected: action.payload,
        },
        // data: finalData,
        // labels: finalLabels,
        // available_slot: availableSlot,
      };
    }

    default:
      return state;
  }
};
