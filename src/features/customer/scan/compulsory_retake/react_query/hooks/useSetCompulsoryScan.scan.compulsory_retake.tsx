import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanRetakeReactQueryKey } from "../keys/keys";
import { setCompulsoryScan } from "src/core/storage/app/compulsory_scan";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { queryClient } from "src/core/utils/react_query";

export const useCompulsoryScanRetakeSetCompulsoryScan = () => {
  const compulsoryScan = queryClient.getQueryData(
    CompulsoryScanRetakeReactQueryKey.GetCompulsoryScan()
  ) as CompulsoryScanStorageInterface;

  const mutation = useMutation<
    CompulsoryScanStorageInterface,
    AxiosError,
    CompulsoryScanStorageInterface["data"]
  >({
    mutationKey: CompulsoryScanRetakeReactQueryKey.SetCompulsoryScan(),
    mutationFn: (data: CompulsoryScanStorageInterface["data"]) => {
      const payload: CompulsoryScanStorageInterface = {
        ...compulsoryScan,
        data: data,
      };
      return setCompulsoryScan(payload);
    },
  });

  return mutation;
};
