import {
  GetCasesResponseInterface,
  GetDiagnosisOverviewRequestInterface,
  GetDiagnosisScreeningsRequestInterface,
  GetDiagnosisTrendsRequestInterface,
} from "src/core/models/api/cases";

export const CustomerDiagnosisReactQueryKey = {
  GetDiagnosisOverview: (payload?: GetDiagnosisOverviewRequestInterface) => [
    "DiagnosisReactQueryKey.GetDiagnosis",
    [payload] as const,
  ],
  GetDiagnosisScreenings: (
    payload?: GetDiagnosisScreeningsRequestInterface
  ) => ["DiagnosisReactQueryKey.GetDiagnosisScreenings", [payload] as const],
  GetDiagnosisTrends: (payload?: GetDiagnosisTrendsRequestInterface) => [
    "DiagnosisReactQueryKey.GetDiagnosisTrends",
    [payload] as const,
  ],

  // old
  SetDiagnosisIssue: () => ["DiagnosisReactQueryKey.SetDiagnosisIssue"],
  SetDiagnosisIssueByCategory: () => [
    "DiagnosisReactQueryKey.SetDiagnosisIssueByCategory",
  ],
  GetCases: () => ["DiagnosisReactQueryKey.GetCases"],
  GetClientCamera: () => ["DiagnosisReactQueryKey.GetClientCamera"],
  GetDiagnosis: (
    timeline: number | null,
    cases: {
      pages: GetCasesResponseInterface[][];
    },
    locale: string
  ) => [
    "DiagnosisReactQueryKey.GetDiagnosis",
    [timeline, cases, locale] as const,
  ],
  SetRecord: () => ["DiagnosisReactQueryKey.SetRecord"],
  SetDiagnosis: () => ["DiagnosisReactQueryKey.SetDiagnosis"],
  SetFactors: () => ["DiagnosisReactQueryKey.SetFactors"],
  SetRecommendations: () => ["DiagnosisReactQueryKey.SetRecommendations"],
  GetDiagnosisStorage: () => ["DiagnosisReactQueryKey.GetDiagnosisStorage"],
};
