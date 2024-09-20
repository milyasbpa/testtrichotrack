import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanReactQueryKey } from "../keys/keys";
import { setCompulsoryScan } from "src/core/storage/app/compulsory_scan";
import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import { useFormContext } from "react-hook-form";
import { CompulsoryScanForm } from "../../react_hook_form/data";

export const useCompulsoryScanSetCompulsoryScan = () => {
  const { watch } = useFormContext<CompulsoryScanForm>();
  const mutation = useMutation<CompulsoryScanStorageInterface, AxiosError>({
    mutationKey: CompulsoryScanReactQueryKey.SetCompulsoryScan(),
    mutationFn: () => {
      const payload: CompulsoryScanStorageInterface = {
        image: watch("image"),
        counter_modal: watch("counter_modal"),
        active_region: watch("active_region"),
        data: watch("data"),
      };
      return setCompulsoryScan(payload);
    },
  });

  return mutation;
};
