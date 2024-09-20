import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SpotlightScanSelectionAreaReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const useSpotlightScanSelectionAreaGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: SpotlightScanSelectionAreaReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
