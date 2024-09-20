import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScanRetake } from "src/core/storage/app";

export const useScanInstructionRemoveCompulsoryScanRetake = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: ScanInstructionReactQueryKey.RemoveCompulsoryScanRetake(),
    queryFn: () => {
      return removeCompulsoryScanRetake();
    },
  });

  return query;
};
