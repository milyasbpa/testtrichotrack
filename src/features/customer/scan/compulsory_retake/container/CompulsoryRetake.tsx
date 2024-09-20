import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import {
  useCompulsoryScanRetakeGetSnapshotWifiMicroscopeCamera,
  useCompulsoryScanRetakePreviewGetCompulsoryScan,
  useCompulsoryScanRetakeSetCompulsoryScan,
} from "../react_query/hooks";
import { useCompulsoryScanRetakePreviewGetCompulsoryScanRetake } from "../react_query/hooks/useGetCompulsoryScanRetake.scan.compulsory_retake";
import { useCompulsoryScanRetakeGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.compulsory_retake";

import { useMutation } from "@tanstack/react-query";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { AxiosError } from "axios";
import { USBMicroscopeCameraCompulsoryScanRetake } from "../components/usb_microscope_camera";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import WifiMicroscopeCameraCompulsoryScanRetake from "../components/wifi_microscope_camera/WifiMicroscopeCamera.scan.compulsory_retake";
import { CompulsoryScanRetakeReactQueryKey } from "../react_query/keys/keys";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { ScanDataSample } from "src/core/utils/mock/data";
import { resizeBase64 } from "src/core/utils/formatters";

export const CompulsoryScanRetakeContainer = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);
  useCompulsoryScanRetakeGetClientCamera();

  const { 
    // isFetching: isFetchingGetCompulsoryScan, 
    data: compulsoryScan } =
    useCompulsoryScanRetakePreviewGetCompulsoryScan();
  const {
    // isFetching: isFetchingGetCompulsoryScanRetake,
    data: compulsoryScanRetake,
  } = useCompulsoryScanRetakePreviewGetCompulsoryScanRetake();
  const { mutateAsync: getSnapshot } =
    useCompulsoryScanRetakeGetSnapshotWifiMicroscopeCamera();
  const { mutateAsync: setCompulsoryScan } =
    useCompulsoryScanRetakeSetCompulsoryScan();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";
  const isUSBDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const canvasID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-canvas__compulsory-retake-scan"
    : "usb-microscope-camera-scan-canvas";
  const videoID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-video__compulsory-retake-scan"
    : "usb-microscope-camera-scan-video";

  const handlePressUSBMicroscopeButton = async () => {
    const canvas = document.getElementById(
      canvasID
    ) as HTMLCanvasElement | null;
    const video = document.getElementById(videoID) as HTMLVideoElement | null;
    if (canvas !== null && video !== null) {
      let context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (context !== null) {
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const originalImage = canvas.toDataURL("image/jpeg");

        const payload =
          compulsoryScan?.data.map((item) => {
            return {
              ...item,
              image:
                item.id === compulsoryScanRetake?.region
                  ? originalImage
                  : item.image,
            };
          }) || [];
        await setCompulsoryScan(payload);

        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          const mediaStream = video.srcObject;
          const tracks = (mediaStream as any).getTracks();
          tracks.forEach((track: any) => {
            track.stop();
          });
        });

        navigate(
          PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      }
    }
  };

  const handlePressWifiMicroscopeButton = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const originalImage = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;

      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const payload =
          compulsoryScan?.data.map((item) => {
            return {
              ...item,
              image:
                item.id === compulsoryScanRetake?.region
                  ? imageResponse
                  : item.image,
            };
          }) || [];
        await setCompulsoryScan(payload);

        navigate(
          PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      });
    } else {
      const data = await getSnapshot();
      const originalImage = `data:image/jpeg;base64,${data.data.snapshot}`;
      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const payload =
          compulsoryScan?.data.map((item) => {
            return {
              ...item,
              image:
                item.id === compulsoryScanRetake?.region
                  ? imageResponse
                  : item.image,
            };
          }) || [];
        await setCompulsoryScan(payload);

        navigate(
          PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      });
    }
  };

  const { mutate: pressButtonListener } = useMutation<
    GetButtonPressStatusResponseInterface,
    AxiosError
  >({
    mutationKey: CompulsoryScanRetakeReactQueryKey.GetButtonPressStatus(),
    mutationFn: () => {
      return fetchGetButtonPressStatus();
    },
    // retry: 0,
    // refetchInterval: 750,
    onSuccess(data) {
      if (
        data.message === "Button pressed !" &&
        appState.device.microscope.selected?.connection !== "WiFi"
      ) {
        handlePressUSBMicroscopeButton();
      }

      if (
        data.message === "Button pressed !" &&
        appState.device.microscope.selected?.connection === "WiFi"
      ) {
        handlePressWifiMicroscopeButton();
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      pressButtonListener();
    }, 750);

    return () => clearInterval(interval);
  }, []);

  const handleClickTakePicture = async (data: { image: string }) => {
    const payload =
      compulsoryScan?.data.map((item) => {
        return {
          ...item,
          image:
            item.id === compulsoryScanRetake?.region ? data.image : item.image,
        };
      }) || [];
    await setCompulsoryScan(payload);

    // if (!isWirelessCamera) {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      const mediaStream = video.srcObject;
      const tracks = (mediaStream as any).getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    });
    // }

    navigate(
      PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({ locale: locale }),
      {
        replace: true,
      }
    );
  };

  const handleCaptureWifiMicroscope = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const originalImage = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;

      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const payload =
          compulsoryScan?.data.map((item) => {
            return {
              ...item,
              image:
                item.id === compulsoryScanRetake?.region
                  ? imageResponse
                  : item.image,
            };
          }) || [];
        await setCompulsoryScan(payload);

        navigate(
          PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      });
    } else {
      const data = await getSnapshot();
      const originalImage = `data:image/jpeg;base64,${data.data.snapshot}`;
      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const payload =
          compulsoryScan?.data.map((item) => {
            return {
              ...item,
              image:
                item.id === compulsoryScanRetake?.region
                  ? imageResponse
                  : item.image,
            };
          }) || [];
        await setCompulsoryScan(payload);

        navigate(
          PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      });
    }
  };

  const handleClickCancel = () => {
    const videos = document.querySelectorAll("video");
    // if (!isWirelessCamera) {
    videos.forEach((video) => {
      const mediaStream = video.srcObject;
      const tracks = (mediaStream as any).getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    });
    // }

    navigate(
      PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({
        locale: locale,
      }),
      {
        replace: true,
      }
    );
  };

  const rescanData = compulsoryScan?.data.find(
    (item) => item.id === compulsoryScanRetake?.region
  );

  const wifiCameraStreamURL = `${
    ENVIRONMENT.DRIVER_API_URL
  }/wifi-microscope/?action=stream&lastmod=${new Date().getTime()}`;

  return (
    <AppContainer>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
          "w-full",
          "h-auto"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col justify-start justify-items-start items-center content-center gap-x-[1rem]"
          )}
        >
          <img src={rescanData?.icon} className={clsx("w-[44px] h-[44px]")} />
          <h3 className={clsx("text-[2rem] text-white font-bold text-center")}>
            {appDictionaries.cases.region.items.find(
              (regionItem) => regionItem.id === rescanData?.region
            )?.name ?? ""}
          </h3>
        </div>

        {/* camera */}

        {isWirelessCamera && (
          <div
            className={clsx(
              "grid",
              "grid-cols-1 place-content-center place-items-center",
              "w-full min-h-[640px]"
            )}
          >
            <WifiMicroscopeCameraCompulsoryScanRetake
              image={wifiCameraStreamURL}
              onCapture={handleCaptureWifiMicroscope}
            />
          </div>
        )}

        {!isWirelessCamera && isUSBDinoLiteCamera && (
          <div
            className={clsx(
              "grid",
              "grid-cols-1 place-content-center place-items-center",
              "w-full min-h-[640px]"
            )}
          >
            <USBMicroscopeCameraCompulsoryScanRetake
              onClick={handleClickTakePicture}
            />
          </div>
        )}

        {!isWirelessCamera && !isUSBDinoLiteCamera && (
          <div
            className={clsx(
              "grid",
              "grid-cols-1 place-content-center place-items-center",
              "w-full min-h-[640px]"
            )}
          >
            <USBMicroscopeCamera onClick={handleClickTakePicture} />
          </div>
        )}
      </div>

      <Button variant={"outlined"} onClick={handleClickCancel}>
        {dictionaries.retake.actions.secondary.toUpperCase()}
      </Button>
    </AppContainer>
  );
};
