import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setPartialScanImageInvalid } from "src/core/storage/app";

export const usePartialInvalidImageRetakeSetPartialScanInvalidImage = () => {
  const mutation = useMutation<
    PartialScanImageInvalidStorageInterface,
    AxiosError,
    PartialScanImageInvalidStorageInterface
  >({
    mutationKey:
      PartialScanImageInvalidRetakeReactQueryKey.SetPartialScanImageInvalid(),
    mutationFn: (payload: PartialScanImageInvalidStorageInterface) => {
      return setPartialScanImageInvalid(payload);
    },
  });

  return mutation;
};
