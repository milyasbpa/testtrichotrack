import { GetScanScreeningRequestInterface } from "src/core/models/api/cases";

export const CustomerScreeningReactQueryKey = {
  GetScreeningStorage: () => [
    "CustomerScreeningReactQueryKey.GetScreeningStorage",
  ],
  GetScanScreening: (payload: GetScanScreeningRequestInterface) => [
    "CustomerScreeningReactQueryKey.GetScanScreening",
    [payload] as const,
  ],
};
