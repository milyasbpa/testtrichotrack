import { useQuery } from "@tanstack/react-query";
import { getCompulsoryScan } from "src/core/storage/app";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanAnotherConfirmationGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface>({
    queryKey: SpotlightScanAnotherConfirmationReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
