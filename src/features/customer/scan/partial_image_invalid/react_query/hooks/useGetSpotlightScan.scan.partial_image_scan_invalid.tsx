import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { getSpotlightScan } from "src/core/storage/app";

export const usePartialScanImageInvalidGetSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: PartialScanImageInvalidReactQueryKey.GetSpotlightScan(),
    queryFn: () => {
      return getSpotlightScan();
    },
  });

  return query;
};
