import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScan } from "src/core/storage/app";

export const useScanInstructionRemoveCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: ScanInstructionReactQueryKey.RemoveCompulsoryScan(),
    queryFn: () => {
      return removeCompulsoryScan();
    },
  });

  return query;
};
