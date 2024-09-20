import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { fetchGetDevice } from "src/core/services/device/get_device";
import { SpotlightScanLimitReactQueryKey } from "../keys/keys";

export const useSpotlightScanLimitScalpGetDevices = () => {
  const query = useQuery<GetDeviceResponseInterface, AxiosError>({
    queryKey: SpotlightScanLimitReactQueryKey.GetDevices(),
    queryFn: () => {
      return fetchGetDevice();
    },
  });

  return query;
};
