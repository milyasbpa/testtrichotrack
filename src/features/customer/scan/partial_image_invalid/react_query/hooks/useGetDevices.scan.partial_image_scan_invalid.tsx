import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { fetchGetDevice } from "src/core/services/device/get_device";
import { PartialScanImageInvalidReactQueryKey } from "../keys/keys";

export const usePartialScanImageInvalidGetDevices = () => {
  const query = useQuery<GetDeviceResponseInterface, AxiosError>({
    queryKey: PartialScanImageInvalidReactQueryKey.GetDevices(),
    queryFn: () => {
      return fetchGetDevice();
    },
  });

  return query;
};
