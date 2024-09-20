import { GetScreeningsRequestInterface } from "src/core/models/api/cases";

export const CustomerComparisonReactQueryKey = {
  GetScanComparisonItems: () => [
    "CustomerComparisonReactQueryKey.GetScanComparisonItems",
  ],
  GetScreening: (payload: GetScreeningsRequestInterface) => [
    "CustomerComparisonReactQueryKey.GetScreening",
    [payload] as const,
  ],
};
