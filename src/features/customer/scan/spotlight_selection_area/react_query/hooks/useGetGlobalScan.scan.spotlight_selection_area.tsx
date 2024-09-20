import { useQuery } from "@tanstack/react-query";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanSelectionAreaReactQueryKey } from "../keys/keys";

export const useSpotlightScanSelectionAreaGetGlobalScan = () => {
  const query = useQuery<GlobalScanStorageInterface>({
    queryKey: SpotlightScanSelectionAreaReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  return query;
};
