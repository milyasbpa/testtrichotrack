import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetSnapshotWifiCamera } from "src/core/services/camera";
import { GetSnapshotWifiCameraResponseInterface } from "src/core/models/api/camera";
import { SpotlightScanReactQueryKey } from "../keys/keys";

export const useSpotlightScanGetSnapshotWifiMicroscopeCamera = () => {
  const mutation = useMutation<
    GetSnapshotWifiCameraResponseInterface,
    AxiosError
  >({
    mutationKey: SpotlightScanReactQueryKey.GetSnapshotWifiMicroscopeCamera(),
    mutationFn: () => {
      return fetchGetSnapshotWifiCamera();
    },
  });

  return mutation;
};
