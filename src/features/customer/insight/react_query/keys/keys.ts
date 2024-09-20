import { GetRatingStatisticsRequestInterface } from "src/core/models/api/dashboard";

export const CustomerInsightReactQueryKey = {
  GetRatingStatistics(payload: GetRatingStatisticsRequestInterface) {
    return [
      "CustomerInsightReactQueryKey.GetRatingStatistics",
      [payload] as const,
    ];
  },
};
