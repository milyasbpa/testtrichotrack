import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanInstructionReactQueryKey } from "../keys/keys";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { removeGlobalScan } from "src/core/storage/app";

export const useGlobalScanInstructionRemoveGlobalScan = () => {
  const query = useQuery<SpotlightScanStorageInterface, AxiosError>({
    queryKey: GlobalScanInstructionReactQueryKey.RemoveGlobalScan(),
    queryFn: () => {
      return removeGlobalScan();
    },
  });

  return query;
};
