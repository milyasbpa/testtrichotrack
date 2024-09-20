import { useQuery } from "@tanstack/react-query";
import { getCompulsoryScan } from "src/core/storage/app";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanConfirmationGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface>({
    queryKey: SpotlightScanConfirmationReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
