import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanSkipReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { removeSpotlightScan } from "src/core/storage/app";

export const useGlobalScanSkipRemoveSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: GlobalScanSkipReactQueryKey.RemoveSpotlightScan(),
    queryFn: () => {
      return removeSpotlightScan();
    },
  });

  return query;
};
