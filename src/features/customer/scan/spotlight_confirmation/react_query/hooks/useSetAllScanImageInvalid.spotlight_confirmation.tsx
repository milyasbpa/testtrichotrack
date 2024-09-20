import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AllScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setAllScanImageInvalid } from "src/core/storage/app";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanConfirmationSetAllScanImageInvalid = () => {
  const query = useMutation<
    AllScanImageInvalidStorageInterface,
    AxiosError,
    AllScanImageInvalidStorageInterface
  >({
    mutationKey:
      SpotlightScanConfirmationReactQueryKey.SetAllScanImageInvalid(),
    mutationFn: (payload: AllScanImageInvalidStorageInterface) => {
      return setAllScanImageInvalid(payload);
    },
  });

  return query;
};
