import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setPartialScanImageInvalid } from "src/core/storage/app";

export const usePartialScanImageInvalidSetPartialScanImageInvalid = () => {
  const mutation = useMutation<
    PartialScanImageInvalidStorageInterface,
    AxiosError,
    PartialScanImageInvalidStorageInterface
  >({
    mutationKey:
      PartialScanImageInvalidReactQueryKey.GetPartialScanImageInvalid(),
    mutationFn: (payload: PartialScanImageInvalidStorageInterface) => {
      return setPartialScanImageInvalid(payload);
    },
  });

  return mutation;
};
