import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScanInstructionReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removePartialScanImageInvalid } from "src/core/storage/app";

export const useScanInstructionRemovePartialScanImageInvalid = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: ScanInstructionReactQueryKey.RemovePartialScanImageInvalid(),
    queryFn: () => {
      return removePartialScanImageInvalid();
    },
  });

  return query;
};
