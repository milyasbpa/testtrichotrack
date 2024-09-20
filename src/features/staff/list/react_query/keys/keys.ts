import { GetStaffsRequestInterface } from "src/core/models/api/staff";

export const DisplayListReactQueryKey = {
  GetUser: () => ["DisplayListReactQueryKey.GetUser"],
  GetStaffs: (payload?: GetStaffsRequestInterface) => [
    "DisplayListReactQueryKey.GetStaffs",
    [payload] as const,
  ],
  GetOutlets: () => ["DisplayListReactQueryKey.GetOutlets"],
  DeleteStaff: () => ["DisplayListReactQueryKey.DeleteStaff"],
  SetStaffID: () => ["DisplayListReactQueryKey.SetStaffID"],
};
