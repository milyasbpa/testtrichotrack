import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { ClientCameraStorageInterface } from "src/core/models/storage/app";
import { setClientCamera } from "src/core/storage/app";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { StaffDeviceReactQueryKey } from "../keys";

export const useCameraSetClientCamera = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const mutation = useMutation<
    ClientCameraStorageInterface,
    any,
    {
      id: number;
      device_id: string;
      connection: string;
      photo: string;
      name: string;
    } | null
  >({
    mutationKey: StaffDeviceReactQueryKey.SetClientCamera(),
    mutationFn: (
      data: {
        id: number;
        device_id: string;
        connection: string;
        photo: string;
        name: string;
      } | null
    ) => {
      const payload: ClientCameraStorageInterface = {
        selected: data,
      };
      return setClientCamera(payload);
    },
    onSuccess(data) {
      if (typeof data.selected != "undefined") {
        dispatchApp({
          type: AppActionEnum.SetDeviceData,
          payload: {
            ...appState.device,
            microscope: {
              ...appState.device.microscope,
              selected: data.selected,
            },
          },
        });
      } else {
        dispatchApp({
          type: AppActionEnum.SetDeviceData,
          payload: {
            ...appState.device,
            microscope: {
              ...appState.device.microscope,
              selected: null,
            },
          },
        });
      }
    },
  });

  return mutation;
};
