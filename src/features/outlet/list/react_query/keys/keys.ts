import { GetOutletsRequestInterface } from "src/core/models/api/outlet";

export const DisplayListReactQueryKey = {
  GetOutlets: (payload?: GetOutletsRequestInterface) => [
    "DisplayListReactQueryKey.GetOutlets",
    [payload] as const
  ],
  DeleteOutlet: () => ["DisplayListReactQueryKey.DeleteStaff"],
  SetOutletID: () => ["DisplayListReactQueryKey.SetStaffID"],
};
