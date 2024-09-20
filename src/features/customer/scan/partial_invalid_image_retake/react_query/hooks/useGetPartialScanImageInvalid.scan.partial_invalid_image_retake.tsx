import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";
import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { getPartialScanImageInvalid } from "src/core/storage/app";

export const usePartialInvalidImageRetakeGetPartialScanInvalidImage = () => {
  const query = useQuery<PartialScanImageInvalidStorageInterface, AxiosError>({
    queryKey:
      PartialScanImageInvalidRetakeReactQueryKey.GetPartialScanImageInvalid(),
    queryFn: () => {
      return getPartialScanImageInvalid();
    },
  });

  return query;
};
