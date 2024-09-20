import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanSkipReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScan } from "src/core/storage/app";

export const useGlobalScanSkipRemoveCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: GlobalScanSkipReactQueryKey.RemoveCompulsoryScan(),
    queryFn: () => {
      return removeCompulsoryScan();
    },
  });

  return query;
};
