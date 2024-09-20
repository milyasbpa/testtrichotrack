import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AllScanImageInvalidReactQueryKey } from "../keys/keys";
import { AllScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import { getAllScanImageInvalid } from "src/core/storage/app";

export const useAllScanImageInvalidGetAllScanImageInvalid = () => {
  const query = useQuery<AllScanImageInvalidStorageInterface, AxiosError>({
    queryKey: AllScanImageInvalidReactQueryKey.GetAllScanImageInvalid(),
    queryFn: () => {
      return getAllScanImageInvalid();
    },
  });

  return query;
};
