import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";
import {
  GlobalScanStorageInterface,
  SpotlightScanStorageInterface,
} from "src/core/models/storage/app";
import { setSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanConfirmationSetSpotlightScan = () => {
  const queryClient = useQueryClient();
  const globalScan = queryClient.getQueryData(
    SpotlightScanConfirmationReactQueryKey.GetGlobalScan()
  ) as GlobalScanStorageInterface;

  const mutation = useMutation<SpotlightScanStorageInterface, AxiosError>({
    mutationKey: SpotlightScanConfirmationReactQueryKey.SetSpotlightScan(),
    mutationFn: () => {
      const payload: SpotlightScanStorageInterface = {
        index: 0,
        data: [
          {
            order: !globalScan.data.length ? 5 : 7,
            id: -1,
            icon: "",
            image: "",
            region: "",
          },
        ],
      };
      return setSpotlightScan(payload);
    },
  });

  return mutation;
};
