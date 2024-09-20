import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const usePartialInvalidImageRetakeGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: PartialScanImageInvalidRetakeReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
