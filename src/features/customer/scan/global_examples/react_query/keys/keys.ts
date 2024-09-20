import { GetScanExamplesGlobalRequestInterface } from "src/core/models/api/configuration";

export const GlobalScanExamplesReactQueryKey = {
  GetScanExamplesGlobal: (payload?: GetScanExamplesGlobalRequestInterface) => [
    "GlobalScanExamplesReactQueryKey.GetScanExamplesGlobal",
    [payload],
  ],
  SetGlobalScan: () => ["GlobalScanExamplesReactQueryKey.SetGlobalScan"],
};
