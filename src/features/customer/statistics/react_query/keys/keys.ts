import { GetAgeStatisticsRequestInterface } from "src/core/models/api/dashboard";

export const CustomerStatisticsReactQueryKey = {
  GetAgeStatistics(payload: GetAgeStatisticsRequestInterface) {
    return [
      "CustomerStatisticsReactQueryKey.GetAgeStatistics",
      [payload] as const,
    ];
  },
  GetGenderStatistics() {
    return ["CustomerStatisticsReactQueryKey.GetGenderStatistics"];
  },
  GetRaceStatistics() {
    return ["CustomerStatisticsReactQueryKey.GetRaceStatistics"];
  },
};
