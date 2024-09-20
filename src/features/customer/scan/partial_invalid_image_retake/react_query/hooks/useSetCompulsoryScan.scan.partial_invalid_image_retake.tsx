import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";
import { setCompulsoryScan } from "src/core/storage/app/compulsory_scan";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";

export const usePartialScanImageInvalidRetakeSetCompulsoryScan = () => {
  const mutation = useMutation<
    CompulsoryScanStorageInterface,
    AxiosError,
    CompulsoryScanStorageInterface
  >({
    mutationKey: PartialScanImageInvalidRetakeReactQueryKey.SetCompulsoryScan(),
    mutationFn: (payload: CompulsoryScanStorageInterface) => {
      return setCompulsoryScan(payload);
    },
  });

  return mutation;
};
