import { useContext } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { PreviewCardCompulsoryScanPreview } from "../components/preview_card/PreviewCard.scan.compulsory";
import {
  useCompulsoryScanPreviewGetClientCamera,
  useCompulsoryScanPreviewGetCompulsoryScan,
  useCompulsoryScanPreviewSetCompulsoryScanRetake,
} from "../react_query/hooks";

import { AppContainer } from "src/core/modules/app/container";
import { AppContext } from "src/core/modules/app/context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Card } from "src/core/ui/components/card/Card";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { ENVIRONMENT } from "src/core/constants";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { Button } from "src/core/ui/components/button";

export const CustomerScanRoutinePreviewContainer = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);

  useCompulsoryScanPreviewGetClientCamera();
  const { data: compulsoryScan } = useCompulsoryScanPreviewGetCompulsoryScan();
  const { mutateAsync: setCompulsoryScanRetake } =
    useCompulsoryScanPreviewSetCompulsoryScanRetake();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const isDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  const handleClickRetake = async (value: number) => {
    await setCompulsoryScanRetake(value);
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
      PrivateRouteURL.routeToCustomerScanRetakeRoutineUrl({ locale: locale }),
      {
        replace: true,
      }
    );
  };

  const handleClickNext = () => {
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
      })
    );
  };

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              {compulsoryScan?.data.map((item, index) => (
                <PreviewCardCompulsoryScanPreview
                  key={index}
                  region={
                    appDictionaries.cases.region.items.find(
                      (regionItem) => regionItem.id === item.region
                    )?.name
                  }
                  image={item.image}
                  icon={item.icon}
                  value={item.id}
                  actions={dictionaries.preview.card.actions}
                  onRetake={handleClickRetake}
                />
              ))}
            </div>
          </VerticalFlexGrow>

          <Button onClick={handleClickNext}>
            <p
              className={clsx("text-[1.25rem] text-white font-bold uppercase")}
            >
              {dictionaries.preview.actions.primary.toUpperCase()}
            </p>
          </Button>
        </VerticalFlexContainer>
      </Card>

      {!isDinoLiteCamera && !isWirelessCamera && (
        <div className={clsx("hidden")}>
          <USBMicroscopeCamera />
        </div>
      )}
    </AppContainer>
  );
};
