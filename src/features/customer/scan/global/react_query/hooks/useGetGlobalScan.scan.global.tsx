import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GlobalScanReactQueryKey } from "../keys/keys";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { getGlobalScan } from "src/core/storage/app";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { GlobalScanForm } from "../../react_hook_form/data";

export const useGlobalScanGetGlobalScan = () => {
  const { setValue } = useFormContext<GlobalScanForm>();
  const query = useQuery<GlobalScanStorageInterface, AxiosError>({
    queryKey: GlobalScanReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });
  useEffect(() => {
    if (query.isSuccess || !!query.data) {
      setValue("data", query.data.data);
    }
  }, [query.data]);

  return query;
};
