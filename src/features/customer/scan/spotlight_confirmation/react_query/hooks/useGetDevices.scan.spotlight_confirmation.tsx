import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { fetchGetDevice } from "src/core/services/device/get_device";
import { SpotlightScanConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanConfirmationGetDevices = () => {
  const query = useQuery<GetDeviceResponseInterface, AxiosError>({
    queryKey: SpotlightScanConfirmationReactQueryKey.GetDevices(),
    queryFn: () => {
      return fetchGetDevice();
    },
  });

  return query;
};
