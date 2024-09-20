import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetDeviceResponseInterface } from "src/core/models/api/device";
import { fetchGetDevice } from "src/core/services/device/get_device";
import { SpotlightScanAnotherConfirmationReactQueryKey } from "../keys/keys";

export const useSpotlightScanAnotherConfirmationScalpGetDevices = () => {
  const query = useQuery<GetDeviceResponseInterface, AxiosError>({
    queryKey: SpotlightScanAnotherConfirmationReactQueryKey.GetDevices(),
    queryFn: () => {
      return fetchGetDevice();
    },
  
  });

  return query;
};
