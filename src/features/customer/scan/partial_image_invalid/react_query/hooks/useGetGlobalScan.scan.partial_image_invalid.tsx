import { useQuery } from "@tanstack/react-query";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";

export const usePartialScanImageInvalidGetGlobalScan = () => {
  const query = useQuery<GlobalScanStorageInterface>({
    queryKey: PartialScanImageInvalidReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  return query;
};
