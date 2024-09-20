import { useQuery } from "@tanstack/react-query";
import { getCompulsoryScan } from "src/core/storage/app";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";

export const usePartialScanImageInvalidGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface>({
    queryKey: PartialScanImageInvalidReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
