import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanSkipReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removePartialScanImageInvalid } from "src/core/storage/app";

export const useGlobalScanSkipRemovePartialScanImageInvalid = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: GlobalScanSkipReactQueryKey.RemovePartialScanImageInvalid(),
    queryFn: () => {
      return removePartialScanImageInvalid();
    },
  });

  return query;
};
