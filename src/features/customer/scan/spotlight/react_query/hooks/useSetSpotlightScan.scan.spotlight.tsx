import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { setSpotlightScan } from "src/core/storage/app";
import { queryClient } from "src/core/utils/react_query";

export const useSpotlightScanSetSpotlightScan = () => {
  const spotlightScan = queryClient.getQueryData(
    SpotlightScanReactQueryKey.GetSpotlightScan()
  ) as SpotlightScanStorageInterface;
  const mutation = useMutation<
    SpotlightScanStorageInterface,
    AxiosError,
    string
  >({
    mutationKey: SpotlightScanReactQueryKey.SetSpotlightScan(),
    mutationFn: (data: string) => {
      const payload: SpotlightScanStorageInterface = {
        ...spotlightScan,
        data: spotlightScan.data.map((item, index) => {
          return {
            ...item,
            image: index === spotlightScan.index ? data : item.image,
          };
        }),
      };
      return setSpotlightScan(payload);
    },
  });

  return mutation;
};
