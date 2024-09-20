import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setPartialScanImageInvalid } from "src/core/storage/app";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";

export const useSpotlightScanLimitSetPartialScanImageInvalid = () => {
  const query = useMutation<
    PartialScanImageInvalidStorageInterface,
    AxiosError,
    PartialScanImageInvalidStorageInterface
  >({
    mutationKey: SpotlightScanLimitReactQueryKey.SetPartialScanImageInvalid(),
    mutationFn: (payload: PartialScanImageInvalidStorageInterface) => {
      return setPartialScanImageInvalid(payload);
    },
  });

  return query;
};
