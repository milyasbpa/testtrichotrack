import { useQuery } from "@tanstack/react-query";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";

export const useSpotlightScanLimitGetGlobalScan = () => {
  const query = useQuery<GlobalScanStorageInterface>({
    queryKey: SpotlightScanLimitReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  return query;
};
