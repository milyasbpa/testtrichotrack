import { useMutation } from "@tanstack/react-query";
import { setOutletID } from "src/core/storage/app";
import { OutletIDStorageInterface } from "src/core/models/storage/app";
import { DashboardStaffReactQueryKey } from "../keys";

export const useDashboardStaffSetOutletID = () => {
  const query = useMutation<OutletIDStorageInterface, any, number>({
    mutationKey: DashboardStaffReactQueryKey.SetOutletID(),
    mutationFn: (id: number) => {
      const payload: OutletIDStorageInterface = {
        id: id,
      };
      return setOutletID(payload);
    },
    retry: 0,
  });

  return query;
};
