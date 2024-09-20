import {
  GetDiagnosisDetailsRequestInterface,
  GetDiagnosisIssueRequestInterface,
  GetDiagnosisOverviewRequestInterface,
  GetFactorLevelInfoRequestInterface,
} from "src/core/models/api/cases";
import { GetRecommendationsMetricRequestInterface } from "src/core/models/api/recommendations";

export const CustomerIssueReactQueryKey = {
  // new
  GetDiagnosisOverview: (payload?: GetDiagnosisOverviewRequestInterface) => [
    "CustomerIssueReactQueryKey.GetDiagnosisOverview",
    [payload] as const,
  ],
  GetFactorLevelInfo: (payload?: GetFactorLevelInfoRequestInterface) => [
    "CustomerIssueReactQueryKey.GetFactorLevelInfo",
    [payload] as const,
  ],
  GetDiagnosisDetails: (payload: GetDiagnosisDetailsRequestInterface) => [
    "CustomerIssueReactQueryKey.GetDiagnosisDetails",
    [payload] as const,
  ],
  GetDiagnosisIssue: (payload?: GetDiagnosisIssueRequestInterface) => [
    "CustomerIssueReactQueryKey.GetDiagnosisIssue",
    [payload] as const,
  ],
  GetRecommendationsMetric: (
    payload: GetRecommendationsMetricRequestInterface
  ) => [
    "CustomerIssueReactQueryKey.GetRecommendationsMetric",
    [payload] as const,
  ],
  // old
  // GetDiagnosisIssue: () => ["CustomerIssueReactQueryKey.GetDiagnosisIssue"],

  SetHomeCares: () => ["CustomerIssueReactQueryKey.SetHomeCares"],
  SetCarePlans: () => ["CustomerIssueReactQueryKey.SetCarePlans"],

  // GetIssue: (payload: GetIssueRequestInterface) => [
  //   "CustomerIssueReactQueryKey.GetIssue",
  //   [payload] as const,
  // ],
  SetScanScreening: () => ["CustomerIssueReactQueryKey.SetScanScreening"],
  GetRecommendations: () => ["CustomerIssueReactQueryKey.GetRecommendations"],
  GetFactors: () => ["CustomerIssueReactQueryKey.GetFactors"],
  SetFactors: () => ["CustomerIssueReactQueryKey.SetFactors"],
  SetRecommendations: () => ["CustomerIssueReactQueryKey.SetRecommendations"],
};
