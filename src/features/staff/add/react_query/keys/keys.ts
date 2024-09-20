import { GetOutletsRequestInterface } from "src/core/models/api/outlet";

export const StaffAddReactQueryKey = {
  GetOutlets: (payload?: GetOutletsRequestInterface) => [
    "StaffAddReactQueryKey.GetOutlets",
    [payload] as const,
  ],
  PostCreateStaff: () => ["StaffAddReactQueryKey.PostCreateStaff"],
};
