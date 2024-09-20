import {
  GetAgeStatisticsRequestInterface,
  GetGenderStatisticsRequestInterface,
  GetRaceStatisticsRequestInterface,
  GetRatingStatisticsRequestInterface,
} from "src/core/models/api/dashboard";

export const CustomerInactiveReactQueryKey = {
  GetAgeStatistics(payload: GetAgeStatisticsRequestInterface) {
    return [
      "CustomerInactiveReactQueryKey.GetAgeStatistics",
      [payload] as const,
    ];
  },
  GetGenderStatistics(payload: GetGenderStatisticsRequestInterface) {
    return [
      "CustomerInactiveReactQueryKey.GetGenderStatistics",
      [payload] as const,
    ];
  },
  GetRaceStatistics(payload: GetRaceStatisticsRequestInterface) {
    return [
      "CustomerInactiveReactQueryKey.GetRaceStatistics",
      [payload] as const,
    ];
  },
  GetRatingStatistics(payload: GetRatingStatisticsRequestInterface) {
    return [
      "CustomerInactiveReactQueryKey.GetRatingStatistics",
      [payload] as const,
    ];
  },
};
