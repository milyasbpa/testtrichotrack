import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetSnapshotWifiCamera } from "src/core/services/camera";
import { GetSnapshotWifiCameraResponseInterface } from "src/core/models/api/camera";
import { CompulsoryScanReactQueryKey } from "../keys/keys";

export const useCompulsoryScanGetSnapshotWifiMicroscopeCamera = () => {
  const mutation = useMutation<
    GetSnapshotWifiCameraResponseInterface,
    AxiosError
  >({
    mutationKey: CompulsoryScanReactQueryKey.GetSnapshotWifiMicroscopeCamera(),
    mutationFn: () => {
      return fetchGetSnapshotWifiCamera();
    },
  });

  return mutation;
};
