import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { getPartialScanImageInvalid } from "src/core/storage/app";

export const usePartialScanImageInvalidGetPartialScanImageInvalid = () => {
  const query = useQuery<PartialScanImageInvalidStorageInterface, AxiosError>({
    queryKey: PartialScanImageInvalidReactQueryKey.GetPartialScanImageInvalid(),
    queryFn: () => {
      return getPartialScanImageInvalid();
    },
  });

  return query;
};
