import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import {
  useSpotlightScanGetButtonPressStatus,
  useSpotlightScanGetSnapshotWifiMicroscopeCamera,
  useSpotlightScanSetSpotlightScan,
} from "../react_query/hooks";

import { useSpotlightScanGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.spotlight";
import { useSpotlightScanGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.spotlight";

import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { useMutation } from "@tanstack/react-query";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { AxiosError } from "axios";
import { USBMicroscopeCameraSpotlightScan } from "../components/usb_microscope_camera";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import WifiMicroscopeCameraSpotlightScan from "../components/wifi_microscope_camera/WifiMicroscopeCamera.scan.spotlight";
import { SpotlightScanReactQueryKey } from "../react_query/keys/keys";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { ScanDataSample } from "src/core/utils/mock/data";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { resizeBase64 } from "src/core/utils/formatters";

export const SpotlightScanContainer = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  useSpotlightScanGetSpotlightScan();
  useSpotlightScanGetClientCamera();
  useSpotlightScanGetButtonPressStatus();
  const { mutateAsync: getSnapshot } =
    useSpotlightScanGetSnapshotWifiMicroscopeCamera();
  const { mutateAsync: setSpotlightScan } = useSpotlightScanSetSpotlightScan();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";
  const isUSBDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const canvasID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-canvas__spotlight-scan"
    : "usb-microscope-camera-scan-canvas";
  const videoID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-video__spotlight-scan"
    : "usb-microscope-camera-scan-video";

  const handleClickCancel = () => {
    if (!isWirelessCamera) {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        const mediaStream = video.srcObject;
        const tracks = (mediaStream as any).getTracks();
        tracks.forEach((track: any) => {
          track.stop();
        });
      });
    }

    navigate(
      PrivateRouteURL.routeToCustomerScanSpotlightConfirmationURL({
        locale: locale,
      }),
      {
        replace: true,
      }
    );
  };

  const handleCaptureWifiMicroscope = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const originalImage = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;

      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        await setSpotlightScan(imageResponse);

        navigate(
          PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
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
        await setSpotlightScan(imageResponse);

        navigate(
          PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
            locale: locale,
          }),
          {
            replace: true,
          }
        );
      });
    }
  };

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
        await setSpotlightScan(originalImage);

        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          const mediaStream = video.srcObject;
          const tracks = (mediaStream as any).getTracks();
          tracks.forEach((track: any) => {
            track.stop();
          });
        });

        navigate(
          PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
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
        await setSpotlightScan(imageResponse);

        navigate(
          PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
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
        await setSpotlightScan(imageResponse);

        navigate(
          PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
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
    mutationKey: SpotlightScanReactQueryKey.GetButtonPressStatus(),
    mutationFn: () => {
      return fetchGetButtonPressStatus();
    },
    retry: 0,
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
    await setSpotlightScan(data.image);

    if (!isWirelessCamera) {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        const mediaStream = video.srcObject;
        const tracks = (mediaStream as any).getTracks();
        tracks.forEach((track: any) => {
          track.stop();
        });
      });
    }

    navigate(
      PrivateRouteURL.routeToCustomerScanSelectSpotlightAreaURL({
        locale: locale,
      }),
      {
        replace: true,
      }
    );
  };

  const wifiCameraStreamURL = `${
    ENVIRONMENT.DRIVER_API_URL
  }/wifi-microscope/?action=stream&lastmod=${new Date().getTime()}`;

  return (
    <AppContainer>
      <div
        className={clsx(
          "flex flex-col justify-between gap-y-[1.5rem]",
          "relative",
          "min-h-[calc(100vh_-_172px)] h-auto w-full",
          "p-[1.5rem]",
          "box-border",
          "rounded-[1.5rem]"
        )}
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)), #121212",
        }}
      >
        {/* camera */}
        {isWirelessCamera && (
          <div
            className={clsx(
              "grid",
              "grid-cols-1 place-content-center place-items-center",
              "w-full min-h-[640px]"
            )}
          >
            <WifiMicroscopeCameraSpotlightScan
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
            <USBMicroscopeCameraSpotlightScan
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

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "w-full"
        )}
      >
        <Button variant={"outlined"} onClick={handleClickCancel}>
          {dictionaries.scan.actions.secondary.toUpperCase()}
        </Button>
      </div>
    </AppContainer>
  );
};
