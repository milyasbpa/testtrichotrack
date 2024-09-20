import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { getCompulsoryScan } from "src/core/storage/app";

export const usePartialInvalidImageRetakeGetCompulsoryScan = () => {
  const query = useQuery<CompulsoryScanStorageInterface, AxiosError>({
    queryKey: PartialScanImageInvalidRetakeReactQueryKey.GetCompulsoryScan(),
    queryFn: () => {
      return getCompulsoryScan();
    },
  });

  return query;
};
