import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: SpotlightScanReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
