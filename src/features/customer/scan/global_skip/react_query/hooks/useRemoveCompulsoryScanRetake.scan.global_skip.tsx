import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanSkipReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { removeCompulsoryScanRetake } from "src/core/storage/app";

export const useGlobalScanSkipRemoveCompulsoryScanRetake = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: GlobalScanSkipReactQueryKey.RemoveCompulsoryScanRetake(),
    queryFn: () => {
      return removeCompulsoryScanRetake();
    },
  });

  return query;
};
