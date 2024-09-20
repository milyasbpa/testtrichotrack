import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetSnapshotWifiCamera } from "src/core/services/camera";
import { GetSnapshotWifiCameraResponseInterface } from "src/core/models/api/camera";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";

export const usePartialInvalidImageRetakeGetSnapshotWifiMicroscopeCamera =
  () => {
    const mutation = useMutation<
      GetSnapshotWifiCameraResponseInterface,
      AxiosError
    >({
      mutationKey:
        PartialScanImageInvalidRetakeReactQueryKey.GetSnapshotWifiMicroscopeCamera(),
      mutationFn: () => {
        return fetchGetSnapshotWifiCamera();
      },
    });

    return mutation;
  };
