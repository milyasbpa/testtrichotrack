import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removePartialScanImageInvalid } from "src/core/storage/app";

export const useGlobalScanInstructionRemovePartialScanImageInvalid = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey:
      GlobalScanInstructionReactQueryKey.RemovePartialScanImageInvalid(),
    queryFn: () => {
      return removePartialScanImageInvalid();
    },
  });

  return query;
};
