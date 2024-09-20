import { GetScanExamplesRequestInterface } from "src/core/models/api/configuration";

export const ScanExamplesReactQueryKey = {
  GetScanExamples: (payload?: GetScanExamplesRequestInterface) => [
    "ScanExamplesReactQueryKey.GetScanExamples",
    [payload],
  ],
};
