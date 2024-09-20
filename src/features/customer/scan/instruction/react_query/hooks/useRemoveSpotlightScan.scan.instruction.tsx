import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScanInstructionReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { removeSpotlightScan } from "src/core/storage/app";

export const useScanInstructionRemoveSpotlightScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: ScanInstructionReactQueryKey.RemoveSpotlightScan(),
    queryFn: () => {
      return removeSpotlightScan();
    },
  });

  return query;
};
