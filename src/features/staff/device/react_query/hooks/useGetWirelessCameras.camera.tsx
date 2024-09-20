import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { fetchGetWirelessCameras } from "src/core/services/camera";
import { GetWirelessCameraResponseInterface } from "src/core/models/api/camera";

import { GetCameraResponseInterface } from "src/core/models/api/configuration";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { StaffDeviceReactQueryKey } from "../keys";
import { queryClient } from "src/core/utils/react_query";

export const useCameraGetWirelessCameras = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  // const queryClient = useQueryClient();
  const cameras = queryClient.getQueryData(
    StaffDeviceReactQueryKey.GetCameras()
  ) as GetCameraResponseInterface[];

  const query = useQuery<GetWirelessCameraResponseInterface, AxiosError>({
    queryKey: StaffDeviceReactQueryKey.GetWirelessCameras(),
    queryFn: () => {
      return fetchGetWirelessCameras();
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
                wireless: [],
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
      let wirelessData: GetCameraResponseInterface[] = [];
      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < cameras.length; j++) {
          if (data.data[i].includes(cameras[j].device_id)) {
            wirelessData = [...wirelessData, cameras[j]];
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
              wireless: wirelessData,
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
