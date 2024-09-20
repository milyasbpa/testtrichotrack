import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanAnotherConfirmationGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: SpotlightScanAnotherConfirmationReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
