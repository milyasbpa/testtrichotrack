import { useMutation } from "@tanstack/react-query";
import { setOutletID } from "src/core/storage/app";
import { OutletIDStorageInterface } from "src/core/models/storage/app";
import { StaffHomeReactQueryKey } from "../keys";

export const useStaffHomeSetOutletID = () => {
  const query = useMutation<OutletIDStorageInterface, any, number>({
    mutationKey: StaffHomeReactQueryKey.SetOutletID(),
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
