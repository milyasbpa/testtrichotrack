import { useQuery } from "@tanstack/react-query";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanConfirmationGetGlobalScan = () => {
  const query = useQuery<GlobalScanStorageInterface>({
    queryKey: SpotlightScanConfirmationReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  return query;
};
