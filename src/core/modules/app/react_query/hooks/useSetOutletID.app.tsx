import { useMutation } from "@tanstack/react-query";
import { setOutletID } from "src/core/storage/app";
import { OutletIDStorageInterface } from "src/core/models/storage/app";
import { AppReactQueryKey } from "../keys";

// NOTES: set outlet current id and will be reset after staff login
export const useAppSetOutletID = () => {
  const query = useMutation<
    OutletIDStorageInterface,
    any,
    OutletIDStorageInterface
  >({
    mutationKey: AppReactQueryKey.SetOutletID(),
    mutationFn: (payload: OutletIDStorageInterface) => {
      return setOutletID(payload);
    },
  });

  return query;
};
