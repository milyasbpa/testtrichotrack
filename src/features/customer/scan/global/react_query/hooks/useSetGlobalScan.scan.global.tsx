import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanReactQueryKey } from "../keys/keys";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { useFormContext } from "react-hook-form";
import { GlobalScanForm } from "../../react_hook_form/data";
import { setGlobalScan } from "src/core/storage/app";

export const useGlobalScanSetGlobalScan = () => {
  const { watch } = useFormContext<GlobalScanForm>();
  const mutation = useMutation<GlobalScanStorageInterface, AxiosError>({
    mutationKey: GlobalScanReactQueryKey.SetGlobalScan(),
    mutationFn: () => {
      const payload: GlobalScanStorageInterface = {
        image: watch("image"),
        counter_modal: watch("counter_modal"),
        active_region: watch("active_region"),
        data: watch("data"),
      };
      return setGlobalScan(payload);
    },
  });

  return mutation;
};
