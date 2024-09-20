import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { setSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanLimitSetSpotlightScan = () => {
  const mutation = useMutation<
    SpotlightScanStorageInterface,
    AxiosError,
    SpotlightScanStorageInterface
  >({
    mutationKey: SpotlightScanLimitReactQueryKey.SetSpotlightScan(),
    mutationFn: (payload: SpotlightScanStorageInterface) => {
      return setSpotlightScan(payload);
    },
  });

  return mutation;
};
