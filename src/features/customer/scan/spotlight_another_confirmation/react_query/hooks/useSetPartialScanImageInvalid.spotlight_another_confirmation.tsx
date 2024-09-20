import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { setPartialScanImageInvalid } from "src/core/storage/app";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanAnotherConfirmationSetPartialScanImageInvalid =
  () => {
    const mutation = useMutation<
      PartialScanImageInvalidStorageInterface,
      AxiosError,
      PartialScanImageInvalidStorageInterface
    >({
      mutationKey:
        SpotlightScanAnotherConfirmationReactQueryKey.SetPartialScanImageInvalid(),
      mutationFn: (payload: PartialScanImageInvalidStorageInterface) => {
        return setPartialScanImageInvalid(payload);
      },
    });

    return mutation;
  };
