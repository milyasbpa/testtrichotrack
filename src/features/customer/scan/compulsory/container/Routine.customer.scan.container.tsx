import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { CounterModalCompulsoryScan } from "../components/counter_modal";
import { ImagePreviewCompulsoryScan } from "../components/image_preview";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import {
  useCompulsoryScanGetSnapshotWifiMicroscopeCamera,
  useCompulsoryScanSetCompulsoryScan,
} from "../react_query/hooks";
import { useFormContext } from "react-hook-form";
import { CompulsoryScanForm } from "../react_hook_form/data";
import { useCompulsoryScanGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.compulsory";
import { resizeBase64 } from "src/core/utils/formatters";
import { useMutation } from "@tanstack/react-query";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { AxiosError } from "axios";
import { CompulsoryScanReactQueryKey } from "../react_query/keys/keys";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { USBMicroscopeCameraCompulsoryScan } from "../components/usb_microscope_camera";
import { WifiMicroscopeCameraCompulsoryScan } from "../components/wifi_microscope_camera/WifiMicroscopeCamera.scan.compulsory";
import { useCompulsoryScanGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.compulsory";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { AppContext } from "src/core/modules/app/context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Card } from "src/core/ui/components/card/Card";
import { ENVIRONMENT } from "src/core/constants";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { ScanDataSample } from "src/core/utils/mock/data";

export const CustomerScanRoutineContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const navigate = useNavigate();
  const { state: appState } = useContext(AppContext);
  const { watch, setValue } = useFormContext<CompulsoryScanForm>();

  useCompulsoryScanGetClientCamera();
  useCompulsoryScanGetGlobalScan();

  const { mutateAsync: setCompulsoryScan } =
    useCompulsoryScanSetCompulsoryScan();

  const { mutateAsync: getSnapshot } =
    useCompulsoryScanGetSnapshotWifiMicroscopeCamera();

  const isWirelessCamera =
    appState.device.microscope.selected?.connection?.includes("WiFi") ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";
  const isUSBDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const canvasID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-canvas__compulsory-scan"
    : "usb-microscope-camera-scan-canvas";
  const videoID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-video__compulsory-scan"
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
        setValue("image", originalImage);

        setValue("counter_modal", { is_open: true });
      }
    }
  };

  const handlePressWifiMicroscopeButton = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const image = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;
      await resizeBase64(image).then((imageResponse: any) => {
        setValue("image", imageResponse);
        setValue("counter_modal", { is_open: true });
      });
    } else {
      const data = await getSnapshot();
      const image = `data:image/jpeg;base64,${data.data.snapshot}`;
      await resizeBase64(image).then((imageResponse: any) => {
        setValue("image", imageResponse);
        setValue("counter_modal", { is_open: true });
      });
    }
  };

  const { mutate: pressButtonListener } = useMutation<
    GetButtonPressStatusResponseInterface,
    AxiosError
  >({
    mutationKey: CompulsoryScanReactQueryKey.GetButtonPressStatus(),
    mutationFn: () => {
      return fetchGetButtonPressStatus();
    },
    retry: 0,
    onSuccess(data) {
      if (
        data.message === "Button pressed !" &&
        appState.device.microscope.selected?.connection !== "WiFi" &&
        !watch("image").length
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
    let interval: NodeJS.Timeout | undefined;
    const isRunning = !watch("counter_modal.is_open");
    if (isRunning) {
      interval = setInterval(() => {
        pressButtonListener();
      }, 750);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [watch("counter_modal.is_open")]);

  const handleClickTakePicture = (data: { image: string }) => {
    setValue("image", data.image);
    setValue("counter_modal", { is_open: true });
  };

  const handleCaptureWifiMicroscope = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const image = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;
      await resizeBase64(image).then((imageResponse: any) => {
        setValue("image", imageResponse);
        setValue("counter_modal", { is_open: true });
      });
    } else {
      const data = await getSnapshot();
      const image = `data:image/jpeg;base64,${data.data.snapshot}`;
      await resizeBase64(image).then((imageResponse: any) => {
        setValue("image", imageResponse);
        setValue("counter_modal", { is_open: true });
      });
    }
  };

  const handleCloseCounterModal = async () => {
    setValue(
      "data",
      watch("data").map((item, index) => {
        return {
          ...item,
          image: index === watch("active_region") ? watch("image") : item.image,
        };
      })
    );
    setValue(
      "active_region",
      watch("active_region") + 1 >= 4
        ? watch("active_region")
        : watch("active_region") + 1
    );

    // NOTE: automatically redirect when compulsory scan is finish
    if (watch("data").filter((item) => !item.image.length).length === 0) {
      await setCompulsoryScan();

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
        PrivateRouteURL.routeToCustomerScanRoutinePreviewURL({ locale: locale })
      );
    }

    setValue("counter_modal", { is_open: false });
    setValue("image", "");
  };

  const handleClickCancel = () => {
    const videos = document.querySelectorAll("video");
    if (!isWirelessCamera) {
      videos.forEach((video) => {
        const mediaStream = video.srcObject;
        const tracks = (mediaStream as any).getTracks();
        tracks.forEach((track: any) => {
          track.stop();
        });
      });
    }

    navigate(
      PrivateRouteURL.routeToCustomerScanImageExamplesURL({ locale: locale })
    );
  };

  const stepNumber =
    appDictionaries.cases.region.items.find(
      (item) => item.id === watch("data")[watch("active_region")].region
    )?.scanning_sequence ?? -1;

  const wifiCameraStreamURL =
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true"
      ? `${ENVIRONMENT.APP_URL}/scan/sample_wifi_size.png`
      : `${
          ENVIRONMENT.DRIVER_API_URL
        }/wifi-microscope/?action=stream&lastmod=${new Date().getTime()}`;
  const limit = 4;
  const message = `${stepNumber}/${limit} ${dictionaries.scan.counter_modal.message}`;

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div className={clsx("flex items-center justify-between w-full")}>
            <div
              className={clsx(
                "grid grid-flow-col justify-start justify-items-start items-center content-center gap-x-[1rem]"
              )}
            >
              <img
                src={watch("data")[watch("active_region") ?? 0].icon}
                className={clsx("w-[44px] h-[44px]")}
              />
              <h3
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {appDictionaries.cases.region.items.find(
                  (item) =>
                    item.id ===
                    watch("data")[watch("active_region") ?? 0].region
                )?.name ?? ""}
              </h3>
            </div>

            <div
              className={clsx(
                "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[0.5rem]"
              )}
            >
              <p
                className={clsx(
                  "text-[0.875rem] text-light-silver font-semibold"
                )}
              >
                {dictionaries.scan.microscope}
              </p>
              <div
                className={clsx(
                  "px-[1rem] py-[0.75rem] bg-raisin-black rounded-[0.5rem]"
                )}
              >
                <p className={clsx("text-[1rem] text-spanish-gray font-bold")}>
                  {appState.device.microscope.selected?.name}
                </p>
              </div>
            </div>
          </div>
          <VerticalFlexGrow>
            {!watch("counter_modal").is_open && isWirelessCamera && (
              <div
                className={clsx(
                  "grid grid-rows-1",
                  "grid-cols-1 place-content-center place-items-center",
                  "w-full h-full"
                )}
              >
                <WifiMicroscopeCameraCompulsoryScan
                  image={wifiCameraStreamURL}
                  onCapture={handleCaptureWifiMicroscope}
                />
              </div>
            )}

            {!isWirelessCamera && !isUSBDinoLiteCamera && (
              <div
                className={clsx(
                  !watch("counter_modal").is_open ? "grid" : "hidden",
                  "grid-cols-1 place-content-center place-items-center",
                  "w-full h-full grid-rows-1"
                )}
              >
                <USBMicroscopeCamera onClick={handleClickTakePicture} />
              </div>
            )}

            {!isWirelessCamera && isUSBDinoLiteCamera && (
              <div
                className={clsx(
                  !watch("counter_modal").is_open ? "grid" : "hidden",
                  "grid-cols-1 place-content-center place-items-center",
                  "w-full h-full",
                  "grid-rows-1"
                )}
              >
                <USBMicroscopeCameraCompulsoryScan
                  onClick={handleClickTakePicture}
                />
              </div>
            )}

            <div
              className={clsx(
                watch("counter_modal").is_open ? "grid" : "hidden",
                "grid-cols-1 grid-rows-1 place-content-center place-items-center",
                "w-full h-full"
              )}
            >
              <ImagePreviewCompulsoryScan image={watch("image")} />
            </div>
          </VerticalFlexGrow>

          <Button variant={"outlined"} onClick={handleClickCancel}>
            {dictionaries.scan.actions.secondary.toUpperCase()}
          </Button>
        </VerticalFlexContainer>
        <CounterModalCompulsoryScan
          open={watch("counter_modal").is_open}
          message={message}
          description={dictionaries.scan.counter_modal.description}
          onClose={handleCloseCounterModal}
        />
      </Card>
    </AppContainer>
  );
};
