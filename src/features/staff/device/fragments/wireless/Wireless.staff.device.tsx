import { useContext } from "react";
import clsx from "clsx";
import { ListCamera } from "../../components/list/List.camera";
import { EmptyListCamera } from "../../components/empty_list/EmptyList.camera";
import { LoaderListCamera } from "../../components/loader_list/LoaderList.camera";
import { useCameraGetWirelessCameras } from "../../react_query/hooks/useGetWirelessCameras.camera";

import { useCameraSetClientCamera } from "../../react_query/hooks/useSetClientCamera.camera";
import { AppContext } from "src/core/modules/app/context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const WirelessStaffDevice = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { mutate: setClientCamera } = useCameraSetClientCamera();
  const { state: appState } = useContext(AppContext);

  const {
    isFetching: isFetchingGetWirelessCameras,
    isRefetching: isRefetchingGetWirelessCameras,
    refetch: refetchWirelessCameras,
  } = useCameraGetWirelessCameras();

  const handleRescan = () => {
    refetchWirelessCameras();
  };

  if (
    !appState.device.microscope.data.wireless.length &&
    !isFetchingGetWirelessCameras
  ) {
    return (
      <div className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}>
        <div
          className={clsx(
            "flex items-center justify-between w-full",
            "p-[0.5rem]"
          )}
        >
          <p className={clsx("text-[1.125rem] font-medium text-light-silver")}>
            {dictionaries.name.wireless}
          </p>
          <button
            className={clsx(
              "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[0.5rem]",
              "text-[1.125rem] text-go-green font-bold uppercase"
            )}
            onClick={handleRescan}
          >
            {dictionaries.actions.rescan}
          </button>
        </div>

        <EmptyListCamera
          message={dictionaries.empty_list.message}
          image_url={dictionaries.empty_list.image_url}
        />
      </div>
    );
  }

  if (isFetchingGetWirelessCameras || isRefetchingGetWirelessCameras) {
    return (
      <div className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}>
        <div
          className={clsx(
            "flex items-center justify-between w-full",
            "p-[0.5rem]"
          )}
        >
          <p className={clsx("text-[1.125rem] font-medium text-light-silver")}>
            {dictionaries.name.wireless}
          </p>
          <button
            className={clsx(
              "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[0.5rem]",
              "text-[1.125rem] text-go-green font-bold uppercase"
            )}
            onClick={handleRescan}
          >
            {dictionaries.actions.rescan}
          </button>
        </div>

        <LoaderListCamera message={dictionaries.loader_list.message} />
      </div>
    );
  }

  const handleSelectItem = (data: {
    id: number;
    device_id: string;
    connection: string;
    photo: string;
    name: string;
  }) => {
    setClientCamera(data);
  };

  return (
    <div className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}>
      <div
        className={clsx(
          "flex items-center justify-between w-full",
          "p-[0.5rem]"
        )}
      >
        <p className={clsx("text-[1.125rem] font-medium text-light-silver")}>
          {dictionaries.name.wireless}
        </p>
        <button
          className={clsx(
            "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[0.5rem]",
            "text-[1.125rem] text-go-green font-bold uppercase"
          )}
          onClick={handleRescan}
        >
          {dictionaries.actions.rescan}
        </button>
      </div>

      {appState.device.microscope.data.wireless.map((item, index) => (
        <ListCamera
          device_id={item.device_id}
          photo={item.photo}
          name={item.name}
          key={index}
          selected={
            appState.device.microscope.selected?.device_id === item.device_id &&
            appState.device.microscope.selected?.connection === "WiFi"
          }
          onSelect={() => handleSelectItem(item)}
        />
      ))}
    </div>
  );
};
