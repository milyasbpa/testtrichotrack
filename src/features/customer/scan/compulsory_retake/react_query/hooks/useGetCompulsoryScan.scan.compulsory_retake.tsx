import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanRetakeReactQueryKey } from "../keys/keys";
import { getCompulsoryScan } from "src/core/storage/app/compulsory_scan";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";

export const useCompulsoryScanRetakePreviewGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: CompulsoryScanRetakeReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
