import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanRetakeReactQueryKey } from "../keys/keys";
import { CompulsoryScanRetakeStorageInterface } from "src/core/models/storage/app";
import { getCompulsoryScanRetake } from "src/core/storage/app/compulsory_scan_retake";

export const useCompulsoryScanRetakePreviewGetCompulsoryScanRetake = () => {
  const query = useQuery<CompulsoryScanRetakeStorageInterface, AxiosError>({
    queryKey: CompulsoryScanRetakeReactQueryKey.GetCompulsoryScanRetake(),
    queryFn: () => {
      return getCompulsoryScanRetake();
    },
  });

  return query;
};
