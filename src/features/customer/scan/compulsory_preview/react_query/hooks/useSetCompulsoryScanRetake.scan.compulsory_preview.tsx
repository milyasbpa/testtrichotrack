import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanPreviewReactQueryKey } from "../keys/keys";
import { CompulsoryScanRetakeStorageInterface } from "src/core/models/storage/app";
import { setCompulsoryScanRetake } from "src/core/storage/app";

export const useCompulsoryScanPreviewSetCompulsoryScanRetake = () => {
  const mutation = useMutation<
    CompulsoryScanRetakeStorageInterface,
    AxiosError,
    CompulsoryScanRetakeStorageInterface["region"]
  >({
    mutationKey: CompulsoryScanPreviewReactQueryKey.SetCompulsoryScanRetake(),
    mutationFn: (data: CompulsoryScanRetakeStorageInterface["region"]) => {
      const payload: CompulsoryScanRetakeStorageInterface = {
        region: data,
      };
      return setCompulsoryScanRetake(payload);
    },
  });

  return mutation;
};
