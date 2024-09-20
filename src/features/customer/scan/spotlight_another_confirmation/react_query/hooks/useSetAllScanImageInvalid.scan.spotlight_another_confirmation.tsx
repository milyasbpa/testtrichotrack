import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AllScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setAllScanImageInvalid } from "src/core/storage/app";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanAnotherConfirmationSetAllScanImageInvalid = () => {
  const query = useMutation<
    AllScanImageInvalidStorageInterface,
    AxiosError,
    AllScanImageInvalidStorageInterface
  >({
    mutationKey:
      SpotlightScanAnotherConfirmationReactQueryKey.SetAllScanImageInvalid(),
    mutationFn: (payload: AllScanImageInvalidStorageInterface) => {
      return setAllScanImageInvalid(payload);
    },
  });

  return query;
};
