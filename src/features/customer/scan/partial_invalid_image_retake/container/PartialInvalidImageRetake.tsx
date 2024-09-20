import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { usePartialInvalidImageRetakeGetSnapshotWifiMicroscopeCamera } from "../react_query/hooks";
import { getDictionaries } from "../i18n";
import { usePartialInvalidImageRetakeGetPartialScanInvalidImage } from "../react_query/hooks/useGetPartialScanImageInvalid.scan.partial_invalid_image_retake";
import { usePartialInvalidImageRetakeGetCompulsoryScan } from "../react_query/hooks/useGetCompulsoryScan.scan.partial_invalid_image_retake";
import { usePartialInvalidImageRetakeGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.partial_invalid_image_retake";
import {
  CompulsoryScanStorageInterface,
  PartialScanImageInvalidStorageInterface,
  SpotlightScanStorageInterface,
} from "src/core/models/storage/app";
import { usePartialInvalidImageRetakeSetPartialScanInvalidImage } from "../react_query/hooks/useSetPartialScanImageInvalid.scan.partial_invalid_image_retake";
import { usePartialInvalidImageRetakeGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.partial_invalid_image_retake";
import { usePartialScanImageInvalidRetakeSetSpotlightScan } from "../react_query/hooks/useSetSpotlightScan.scan.partial_invalid_image_retake";
import { usePartialScanImageInvalidRetakeSetCompulsoryScan } from "../react_query/hooks/useSetCompulsoryScan.scan.partial_invalid_image_retake";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { useMutation } from "@tanstack/react-query";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { AxiosError } from "axios";

import { USBMicroscopeCameraPartialInvalidScanImageRetake } from "../components/usb_microscope_camera";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import WifiMicroscopeCameraPartialInvalidScanImageRetake from "../components/wifi_microscope_camera/WifiMicroscopeCamera.scan.partial_invalid_image_retake";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../react_query/keys";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { ScanDataSample } from "src/core/utils/mock/data";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { resizeBase64 } from "src/core/utils/formatters";

export const PartialInvalidScanImageRetakeContainer = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);

  usePartialInvalidImageRetakeGetClientCamera();
  const { data: partialScanImageInvalid } =
    usePartialInvalidImageRetakeGetPartialScanInvalidImage();
  const { data: compulsoryScan } =
    usePartialInvalidImageRetakeGetCompulsoryScan();
  const { data: spotlightScan } =
    usePartialInvalidImageRetakeGetSpotlightScan();

  const { mutateAsync: setCompulsoryScan } =
    usePartialScanImageInvalidRetakeSetCompulsoryScan();
  const { mutateAsync: setSpotlightScan } =
    usePartialScanImageInvalidRetakeSetSpotlightScan();

  const { mutateAsync: getSnapshot } =
    usePartialInvalidImageRetakeGetSnapshotWifiMicroscopeCamera();

  const { mutateAsync: setPartialScanImageInvalid } =
    usePartialInvalidImageRetakeSetPartialScanInvalidImage();
  const isWirelessCamera =
    appState.device.microscope.selected !== null &&
    appState.device.microscope.selected?.connection.includes("WiFi");
  // ||
  // ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";
  const isUSBDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const canvasID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-canvas__partial-invalid-scan-image-retake"
    : "usb-microscope-camera-scan-canvas";
  const videoID = isUSBDinoLiteCamera
    ? "usb-microscope-camera-scan-video__partial-invalid-scan-image-retake"
    : "usb-microscope-camera-scan-video";

  const handleClickTakePicture = async (data: { image: string }) => {
    const compulsoryScanPayload: CompulsoryScanStorageInterface = {
      image: compulsoryScan?.image || "",
      counter_modal: compulsoryScan?.counter_modal || {
        is_open: false,
      },
      active_region: compulsoryScan?.active_region || 0,
      data:
        compulsoryScan?.data.map((item) => {
          return {
            ...item,
            image:
              item.order === partialScanImageInvalid?.retake_region_order
                ? data.image
                : item.image,
          };
        }) ?? [],
    };
    await setCompulsoryScan(compulsoryScanPayload);
    const spotlightScanPayload: SpotlightScanStorageInterface = {
      index: spotlightScan?.index || 0,
      data:
        spotlightScan?.data.map((item) => {
          return {
            ...item,
            image:
              item.order === partialScanImageInvalid?.retake_region_order
                ? data.image
                : item.image,
          };
        }) ?? [],
    };
    await setSpotlightScan(spotlightScanPayload);
    const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
      {
        orders:
          partialScanImageInvalid?.orders.filter(
            (scan) => scan !== partialScanImageInvalid?.retake_region_order
          ) ?? [],
        scans:
          partialScanImageInvalid?.scans.map((item) => {
            return {
              ...item,

              image:
                item.order === partialScanImageInvalid?.retake_region_order
                  ? data.image
                  : item.image,
            };
          }) ?? [],
        // default to region order 1 / Middle Crown
        retake_region_order: 1,
      };
    await setPartialScanImageInvalid(partialScanImageInvalidPayload);

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
      PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
        locale: locale,
      })
    );
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

        const compulsoryScanPayload: CompulsoryScanStorageInterface = {
          image: compulsoryScan?.image || "",
          counter_modal: compulsoryScan?.counter_modal || {
            is_open: false,
          },
          active_region: compulsoryScan?.active_region || 0,
          data:
            compulsoryScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? originalImage
                    : item.image,
              };
            }) ?? [],
        };
        await setCompulsoryScan(compulsoryScanPayload);
        const spotlightScanPayload: SpotlightScanStorageInterface = {
          index: spotlightScan?.index || 0,
          data:
            spotlightScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? originalImage
                    : item.image,
              };
            }) ?? [],
        };
        await setSpotlightScan(spotlightScanPayload);

        const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
          {
            orders:
              partialScanImageInvalid?.orders.filter(
                (scan) => scan !== partialScanImageInvalid?.retake_region_order
              ) ?? [],
            scans:
              partialScanImageInvalid?.scans.map((item) => {
                return {
                  ...item,

                  image:
                    item.order === partialScanImageInvalid?.retake_region_order
                      ? originalImage
                      : item.image,
                };
              }) ?? [],
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          };
        await setPartialScanImageInvalid(partialScanImageInvalidPayload);

        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          const mediaStream = video.srcObject;
          const tracks = (mediaStream as any).getTracks();
          tracks.forEach((track: any) => {
            track.stop();
          });
        });

        navigate(
          PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
            locale: locale,
          })
        );
      }
    }
  };

  const handlePressWifiMicroscopeButton = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const originalImage = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;
      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const compulsoryScanPayload: CompulsoryScanStorageInterface = {
          image: compulsoryScan?.image || "",
          counter_modal: compulsoryScan?.counter_modal || {
            is_open: false,
          },
          active_region: compulsoryScan?.active_region || 0,
          data:
            compulsoryScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setCompulsoryScan(compulsoryScanPayload);

        const spotlightScanPayload: SpotlightScanStorageInterface = {
          index: spotlightScan?.index || 0,
          data:
            spotlightScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };

        await setSpotlightScan(spotlightScanPayload);

        const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
          {
            orders:
              partialScanImageInvalid?.orders.filter(
                (scan) => scan !== partialScanImageInvalid?.retake_region_order
              ) ?? [],
            scans:
              partialScanImageInvalid?.scans.map((item) => {
                return {
                  ...item,
                  image:
                    item.order === partialScanImageInvalid?.retake_region_order
                      ? imageResponse
                      : item.image,
                };
              }) ?? [],
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          };
        await setPartialScanImageInvalid(partialScanImageInvalidPayload);

        navigate(
          PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
            locale: locale,
          })
        );
      });
    } else {
      const data = await getSnapshot();
      const originalImage = `data:image/jpeg;base64,${data.data.snapshot}`;
      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const compulsoryScanPayload: CompulsoryScanStorageInterface = {
          image: compulsoryScan?.image || "",
          counter_modal: compulsoryScan?.counter_modal || {
            is_open: false,
          },
          active_region: compulsoryScan?.active_region || 0,
          data:
            compulsoryScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setCompulsoryScan(compulsoryScanPayload);

        const spotlightScanPayload: SpotlightScanStorageInterface = {
          index: spotlightScan?.index || 0,
          data:
            spotlightScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setSpotlightScan(spotlightScanPayload);

        const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
          {
            orders:
              partialScanImageInvalid?.orders.filter(
                (scan) => scan !== partialScanImageInvalid?.retake_region_order
              ) ?? [],
            scans:
              partialScanImageInvalid?.scans.map((item) => {
                return {
                  ...item,

                  image:
                    item.order === partialScanImageInvalid?.retake_region_order
                      ? imageResponse
                      : item.image,
                };
              }) ?? [],
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          };
        await setPartialScanImageInvalid(partialScanImageInvalidPayload);

        navigate(
          PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
            locale: locale,
          })
        );
      });
    }
  };

  const { mutate: pressButtonListener } = useMutation<
    GetButtonPressStatusResponseInterface,
    AxiosError
  >({
    mutationKey:
      PartialScanImageInvalidRetakeReactQueryKey.GetButtonPressStatus(),
    mutationFn: () => {
      return fetchGetButtonPressStatus();
    },

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

  const handleCaptureWifiMicroscope = async () => {
    if (ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true") {
      const originalImage = `data:image/jpeg;base64,${ScanDataSample.GOOD}`;
      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const compulsoryScanPayload: CompulsoryScanStorageInterface = {
          image: compulsoryScan?.image || "",
          counter_modal: compulsoryScan?.counter_modal || {
            is_open: false,
          },
          active_region: compulsoryScan?.active_region || 0,
          data:
            compulsoryScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setCompulsoryScan(compulsoryScanPayload);

        const spotlightScanPayload: SpotlightScanStorageInterface = {
          index: spotlightScan?.index || 0,
          data:
            spotlightScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setSpotlightScan(spotlightScanPayload);

        const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
          {
            orders:
              partialScanImageInvalid?.orders.filter(
                (scan) => scan !== partialScanImageInvalid?.retake_region_order
              ) ?? [],
            scans:
              partialScanImageInvalid?.scans.map((item) => {
                return {
                  ...item,
                  image:
                    item.order === partialScanImageInvalid?.retake_region_order
                      ? imageResponse
                      : item.image,
                };
              }) ?? [],
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          };
        await setPartialScanImageInvalid(partialScanImageInvalidPayload);

        navigate(
          PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
            locale: locale,
          })
        );
      });
    } else {
      const data = await getSnapshot();
      const originalImage = `data:image/jpeg;base64,${data.data.snapshot}`;

      await resizeBase64(originalImage).then(async (imageResponse: any) => {
        const compulsoryScanPayload: CompulsoryScanStorageInterface = {
          image: compulsoryScan?.image || "",
          counter_modal: compulsoryScan?.counter_modal || {
            is_open: false,
          },
          active_region: compulsoryScan?.active_region || 0,
          data:
            compulsoryScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setCompulsoryScan(compulsoryScanPayload);

        const spotlightScanPayload: SpotlightScanStorageInterface = {
          index: spotlightScan?.index || 0,
          data:
            spotlightScan?.data.map((item) => {
              return {
                ...item,
                image:
                  item.order === partialScanImageInvalid?.retake_region_order
                    ? imageResponse
                    : item.image,
              };
            }) ?? [],
        };
        await setSpotlightScan(spotlightScanPayload);

        const partialScanImageInvalidPayload: PartialScanImageInvalidStorageInterface =
          {
            orders:
              partialScanImageInvalid?.orders.filter(
                (scan) => scan !== partialScanImageInvalid?.retake_region_order
              ) ?? [],
            scans:
              partialScanImageInvalid?.scans.map((item) => {
                return {
                  ...item,
                  image:
                    item.order === partialScanImageInvalid?.retake_region_order
                      ? imageResponse
                      : item.image,
                };
              }) ?? [],
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          };
        await setPartialScanImageInvalid(partialScanImageInvalidPayload);

        navigate(
          PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
            locale: locale,
          })
        );
      });
    }
  };

  const handleClickCancel = async () => {
    const payload: PartialScanImageInvalidStorageInterface =
      partialScanImageInvalid
        ? {
            ...partialScanImageInvalid,
            // default to region order 1 / Middle Crown
            retake_region_order: 1,
          }
        : { retake_region_order: 1, scans: [], orders: [] };
    await setPartialScanImageInvalid(payload);

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
      PrivateRouteURL.routeToCustomerScanViewPartialImageInvalidURL({
        locale: locale,
      })
    );
  };

  const wifiCameraStreamURL = `${
    ENVIRONMENT.DRIVER_API_URL
  }/wifi-microscope/?action=stream&lastmod=${new Date().getTime()}`;

  const rescanData = [
    ...(compulsoryScan?.data ?? []),
    ...(spotlightScan?.data ?? []),
  ].find(
    (item) => item.order === partialScanImageInvalid?.retake_region_order ?? 0
  );

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
          <img
            src={rescanData?.icon || ""}
            className={clsx("w-[44px] h-[44px]")}
          />
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
            <WifiMicroscopeCameraPartialInvalidScanImageRetake
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
            <USBMicroscopeCameraPartialInvalidScanImageRetake
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
