import { useQuery } from "@tanstack/react-query";
import { getCompulsoryScan } from "src/core/storage/app";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";

export const useSpotlightScanLimitGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface>({
    queryKey: SpotlightScanLimitReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
