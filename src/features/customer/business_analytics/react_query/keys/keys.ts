import {
  GetCustomerRegistrationStatisticsRequestInterface,
  GetCustomerVisitRequestInterface,
  GetReportRequestRequestInterface,
} from "src/core/models/api/dashboard";

export const CustomerBusinessAnalyticsReactQueryKey = {
  GetCustomerRegistrationStatistics(
    payload: GetCustomerRegistrationStatisticsRequestInterface
  ) {
    return [
      "CustomerBusinessAnalyticsReactQueryKey.GetCustomerRegistrationStatistics",
      [payload] as const,
    ];
  },
  GetCustomerVisitStatistics(payload: GetCustomerVisitRequestInterface) {
    return [
      "CustomerBusinessAnalyticsReactQueryKey.GetCustomerVisitStatistics",
      [payload] as const,
    ];
  },
  GetReportRequestStatistics(payload: GetReportRequestRequestInterface) {
    return [
      "CustomerBusinessAnalyticsReactQueryKey.GetReportRequestStatistics",
      [payload] as const,
    ];
  },
  GetVisitStatistics() {
    return ["CustomerBusinessAnalyticsReactQueryKey.GetVisitStatistics"];
  },
  GetOutlets() {
    return ["CustomerBusinessAnalyticsReactQueryKey.GetOutlets"];
  },
};
