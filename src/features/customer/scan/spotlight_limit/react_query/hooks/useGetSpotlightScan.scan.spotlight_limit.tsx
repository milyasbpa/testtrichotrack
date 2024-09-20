import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanLimitGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: SpotlightScanLimitReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
