import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScanRetake } from "src/core/storage/app";

export const useGlobalScanInstructionRemoveCompulsoryScanRetake = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: GlobalScanInstructionReactQueryKey.RemoveCompulsoryScanRetake(),
    queryFn: () => {
      return removeCompulsoryScanRetake();
    },
  });

  return query;
};
