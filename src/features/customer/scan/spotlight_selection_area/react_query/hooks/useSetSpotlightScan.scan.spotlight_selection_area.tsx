import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanSelectionAreaReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { setSpotlightScan } from "src/core/storage/app";
import { queryClient } from "src/core/utils/react_query";

export const useSpotlightScanSelectionAreaSetSpotlightScan = () => {
  const spotlightScan = queryClient.getQueryData(
    SpotlightScanSelectionAreaReactQueryKey.GetSpotlightScan()
  ) as SpotlightScanStorageInterface;
  const mutation = useMutation<
    SpotlightScanStorageInterface,
    AxiosError,
    SpotlightScanStorageInterface["data"]
  >({
    mutationKey: SpotlightScanSelectionAreaReactQueryKey.SetSpotlightScan(),
    mutationFn: (data: SpotlightScanStorageInterface["data"]) => {
      const payload: SpotlightScanStorageInterface = {
        ...spotlightScan,
        data: data,
      };
      return setSpotlightScan(payload);
    },
  });

  return mutation;
};
