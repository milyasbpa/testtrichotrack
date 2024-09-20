import { GetCarePlanByIdRequestInterface } from "src/core/models/api/recommendations";

export const CustomerCarePlansReactQueryKey = {
  GetCarePlanById: (payload: GetCarePlanByIdRequestInterface) => [
    "CustomerCarePlansReactQueryKey.GetCarePlanById",
    [payload] as const,
  ],
  GetDiagnosisOverview: () => [
    "CustomerCarePlansReactQueryKey.GetDiagnosisOverview",
  ],

  SetCarePlans: () => ["CustomerCarePlansReactQueryKey.SetCarePlans"],
};
