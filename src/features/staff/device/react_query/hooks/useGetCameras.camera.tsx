import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetCameras } from "src/core/services/configuration";
import {
  GetCameraRequestInterface,
  GetCameraResponseInterface,
} from "src/core/models/api/configuration";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { StaffDeviceReactQueryKey } from "../keys";
import { queryClient } from "src/core/utils/react_query";
import { AppReactQueryKey } from "src/core/modules/app/react_query/keys";
import { DeviceStorageInterface } from "src/core/models/storage/app";

export const useCameraGetCameras = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice()) as
    | undefined
    | DeviceStorageInterface;

  const query = useQuery<GetCameraResponseInterface[], AxiosError>({
    queryKey: StaffDeviceReactQueryKey.GetCameras(),
    queryFn: () => {
      const payload: GetCameraRequestInterface = {
        apiKey: device?.secret_client.value || "",
      };
      return fetchGetCameras(payload);
    },
    retry: 0,
    enabled: !!device,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatchApp({
        type: AppActionEnum.SetDeviceData,
        payload: {
          ...appState.device,
          microscope: {
            ...appState.device.microscope,

            data: {
              ...appState.device.microscope.data,
              camera: data.map((item) => item),
            },
          },
        },
      });
    }
  }, [query.data]);

  return query;
};
