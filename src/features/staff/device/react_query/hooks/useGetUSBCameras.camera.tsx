import { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { fetchGetUSBCameras } from "src/core/services/camera";
import { GetUSBCameraResponseInterface } from "src/core/models/api/camera";
import { GetCameraResponseInterface } from "src/core/models/api/configuration";
import { StaffDeviceReactQueryKey } from "../keys";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const useCameraGetUSBCameras = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const queryClient = useQueryClient();
  const cameras = queryClient.getQueryData(
    StaffDeviceReactQueryKey.GetCameras()
  ) as GetCameraResponseInterface[];

  const query = useQuery<GetUSBCameraResponseInterface, AxiosError>({
    queryKey: StaffDeviceReactQueryKey.GetUSBCameras(),
    queryFn: () => {
      return fetchGetUSBCameras();
    },
    retry: 0,
    enabled: !!appState.device.microscope.data.camera.length,
  });

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404) {
        dispatchApp({
          type: AppActionEnum.SetDeviceData,
          payload: {
            ...appState.device,
            microscope: {
              ...appState.device.microscope,
              data: {
                ...appState.device.microscope.data,
                usb: [],
              },
            },
          },
        });
      }
    }
  }, [query.error]);

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      let usbData: GetCameraResponseInterface[] = [];
      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < cameras.length; j++) {
          if (data.data[i].includes(cameras[j].device_id)) {
            usbData = [...usbData, cameras[j]];
          }
        }
      }

      dispatchApp({
        type: AppActionEnum.SetDeviceData,
        payload: {
          ...appState.device,
          microscope: {
            ...appState.device.microscope,
            data: {
              ...appState.device.microscope.data,
              usb: usbData,
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
