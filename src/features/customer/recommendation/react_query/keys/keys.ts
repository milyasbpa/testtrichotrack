import { GetOverallRecommendationsRequestInterface } from "src/core/models/api/recommendations";

export const CustomerRecommendationReactQueryKey = {
  GetRecommendations: () => [
    "CustomerRecommendationReactQueryKey.GetRecommendations",
  ],
  SetRecord: () => ["CustomerRecommendationReactQueryKey.SetRecord"],
  SetDiagnosis: () => ["CustomerRecommendationReactQueryKey.SetDiagnosis"],
  SetRecommendations: () => [
    "CustomerRecommendationReactQueryKey.SetRecommendations",
  ],

  SetHomeCares: () => ["CustomerRecommendationReactQueryKey.SetHomeCares"],

  SetCarePlans: () => ["CustomerRecommendationReactQueryKey.SetCarePlans"],
  GetCases: () => ["CustomerRecommendationReactQueryKey.GetCases"],
  SetReport: () => ["CustomerRecommendationReactQueryKey.SetReport"],

  // new
  GetOverallRecommendations: (
    payload: GetOverallRecommendationsRequestInterface
  ) => [
    "CustomerRecommendationReactQueryKey.GetOverallEnglishRecommendations",
    [payload] as const,
  ],
};
