import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanInstructionReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { removeSpotlightScan } from "src/core/storage/app";

export const useGlobalScanInstructionRemoveSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: GlobalScanInstructionReactQueryKey.RemoveSpotlightScan(),
    queryFn: () => {
      return removeSpotlightScan();
    },
  });

  return query;
};
