import { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { ImagePreviewGlobalScan } from "../components/image_preview";
import { useGlobalScanSetGlobalScan } from "../react_query/hooks";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useFormContext } from "react-hook-form";
import { GlobalScanForm } from "../react_hook_form/data";
import { useGlobalScanGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.global";
import { RearCamera } from "../components/rear_camera";
import { useGlobalScanGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.global";
import { AppContainer } from "src/core/modules/app/container";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Button } from "src/core/ui/components/button";
import { ENVIRONMENT } from "src/core/constants";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerScanGlobalContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const navigate = useNavigate();

  const { watch, setValue } = useFormContext<GlobalScanForm>();
  const [isCameraAvailable, setIsCameraAvailable] = useState<null | boolean>(
    null
  );

  useGlobalScanGetGlobalScan();
  useGlobalScanGetClientCamera();

  const { mutateAsync: setGlobalScan } = useGlobalScanSetGlobalScan();

  const handleClickTakePicture = (data: { image: string }) => {
    setValue("image", data.image);
    setValue("counter_modal", { is_open: true });
  };

  const handleClickCancel = () => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      const mediaStream = video.srcObject;
      const tracks = (mediaStream as any).getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    });

    navigate(
      PrivateRouteURL.routeToCustomerScanGlobalImageExamplesURL({
        locale: locale,
      })
    );
  };

  const handleClickRetake = () => {
    setValue(
      "data",
      watch("data").map((item, index) => {
        return {
          ...item,
          image: index === watch("active_region") ? "" : item.image,
        };
      })
    );
    setValue("counter_modal", { is_open: false });
  };
  const handleClickNext = async () => {
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
      watch("active_region") + 1 >= 2
        ? watch("active_region")
        : watch("active_region") + 1
    );

    // NOTE: automatically redirect when global scan is finish
    if (watch("data").filter((item) => !item.image.length).length === 0) {
      await setGlobalScan();
      const videos = document.querySelectorAll("video");

      videos.forEach((video) => {
        const mediaStream = video.srcObject;
        const tracks = (mediaStream as any).getTracks();
        tracks.forEach((track: any) => {
          track.stop();
        });
      });

      navigate(
        PrivateRouteURL.routeToCustomerScanInstructionURL({ locale: locale })
      );
    }

    setValue("counter_modal", { is_open: false });
    setValue("image", "");
  };

  useEffect(() => {
    let cameraName: string = "";
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        devices.forEach((device) => {
          console.log(device.label,'device label')
          if (!cameraName.length) {
            if (device.label.toLowerCase().includes("surface camera rear")) {
              cameraName = device.label;
            } else {
              if (device.label.toLowerCase().includes("logitech streamcam")) {
                cameraName = device.label;
              } else {
                if (ENVIRONMENT.MOCK_GLOBAL_CAMERA === "true") {
                  if (device.label.toLowerCase().includes("facetime")) {
                    cameraName = device.label;
                  }
                }
              }
            }
          }
        });
        if (!cameraName.length) {
          // navigate(
          //   PrivateRouteURL.routeToCustomerScanGlobalCameraErrorURL({
          //     locale: locale,
          //   })
          // );
        } else {
          setIsCameraAvailable(true);
        }
      });
  }, []);

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
          </div>

          <VerticalFlexGrow>
            <div
              className={clsx(
                !watch("counter_modal").is_open ? "grid" : "hidden",
                "grid-cols-1 place-content-center place-items-center",
                "w-full",
                "h-full",
                "grid-rows-1",
                "relative"
              )}
            >
              {isCameraAvailable && (
                <RearCamera
                  active_region={watch("active_region")}
                  onClick={handleClickTakePicture}
                />
              )}
            </div>

            <div
              className={clsx(
                watch("counter_modal").is_open ? "grid" : "hidden",
                "grid-cols-1 grid-rows-1 place-content-center place-items-center",
                "w-full h-full"
              )}
            >
              <ImagePreviewGlobalScan image={watch("image")} />
            </div>
          </VerticalFlexGrow>

          {!watch("counter_modal").is_open && (
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
          )}

          {watch("counter_modal").is_open && (
            <div
              className={clsx(
                "grid grid-cols-2 place-content-center place-items-center gap-[1.5rem]",
                "w-full"
              )}
            >
              <Button variant={"outlined"} onClick={handleClickRetake}>
                {dictionaries.preview.actions.secondary.toUpperCase()}
              </Button>
              <Button variant="contained" onClick={handleClickNext}>
                {dictionaries.preview.actions.primary.toUpperCase()}
              </Button>
            </div>
          )}
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
