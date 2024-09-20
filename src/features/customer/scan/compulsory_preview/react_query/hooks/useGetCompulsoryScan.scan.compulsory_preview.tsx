import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanPreviewReactQueryKey } from "../keys/keys";
import { getCompulsoryScan } from "src/core/storage/app/compulsory_scan";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";

export const useCompulsoryScanPreviewGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: CompulsoryScanPreviewReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
