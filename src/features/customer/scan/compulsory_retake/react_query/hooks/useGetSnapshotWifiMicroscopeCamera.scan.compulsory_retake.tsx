import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetSnapshotWifiCamera } from "src/core/services/camera";
import { GetSnapshotWifiCameraResponseInterface } from "src/core/models/api/camera";
import { CompulsoryScanRetakeReactQueryKey } from "../keys/keys";

export const useCompulsoryScanRetakeGetSnapshotWifiMicroscopeCamera = () => {
  const mutation = useMutation<
    GetSnapshotWifiCameraResponseInterface,
    AxiosError
  >({
    mutationKey:
      CompulsoryScanRetakeReactQueryKey.GetSnapshotWifiMicroscopeCamera(),
    mutationFn: () => {
      return fetchGetSnapshotWifiCamera();
    },
  });

  return mutation;
};
