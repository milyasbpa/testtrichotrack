import { useQuery } from "@tanstack/react-query";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanAnotherConfirmationGetGlobalScan = () => {
  const query = useQuery<GlobalScanStorageInterface>({
    queryKey: SpotlightScanAnotherConfirmationReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  return query;
};
