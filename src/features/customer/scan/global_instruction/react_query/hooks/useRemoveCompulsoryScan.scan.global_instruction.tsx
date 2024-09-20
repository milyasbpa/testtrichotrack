import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScan } from "src/core/storage/app";

export const useGlobalScanInstructionRemoveCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: GlobalScanInstructionReactQueryKey.RemoveCompulsoryScan(),
    queryFn: () => {
      return removeCompulsoryScan();
    },
  });

  return query;
};
