import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { useNavigate, useParams } from "react-router-dom";
import { FunFactModalSpotlightAnotherScanConfirmation } from "../components/fun_fact_modal";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useSpotlightScanAnotherConfirmationGetSpotlightScan } from "../react_query/hooks/useGetSpotlightScan.scan.spotlight_another_confirmation";
import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import { useSpotlightScanAnotherConfirmationSetSpotlightScan } from "../react_query/hooks/useSetSpotlightScan.scan.spotlight_another_confirmation";
import { useSpotlightScanAnotherConfirmationScalpPostCases } from "../react_query/hooks/usePostCases.scan.spotlight_another_confirmation";
import { useSpotlightScanAnotherConfirmationGetCompulsoryScan } from "../react_query/hooks/useGetCompulsoryScan.scan.spotlight_another_confirmation";
import { useSpotlightScanAnotherConfirmationScalpGetDevices } from "../react_query/hooks/useGetDevices.scan.spotlight_another_confirmation";
import { useSpotlightScanAnotherConfirmationGetClientCamera } from "../react_query/hooks/useGetClientCamera.scan.spotlight_another_confirmation";
import { USBMicroscopeCamera } from "src/core/ui/components/usb_microscope_camera";
import { useSpotlightScanAnotherConfirmationGetGlobalScan } from "../react_query/hooks/useGetGlobalScan.scan.spotlight_another_confirmation";
import { AppContext } from "src/core/modules/app/context";
import { ENVIRONMENT } from "src/core/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const SpotlightAnotherScanConfirmationContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const navigate = useNavigate();
  const { state: appState } = useContext(AppContext);

  useSpotlightScanAnotherConfirmationGetClientCamera();
  useSpotlightScanAnotherConfirmationGetCompulsoryScan();
  const { data: globalScan } =
    useSpotlightScanAnotherConfirmationGetGlobalScan();
  useSpotlightScanAnotherConfirmationGetSpotlightScan();
  useSpotlightScanAnotherConfirmationScalpGetDevices();
  const { data: spotlightScan } =
    useSpotlightScanAnotherConfirmationGetSpotlightScan();
  const { mutateAsync: setSpotlightScan } =
    useSpotlightScanAnotherConfirmationSetSpotlightScan();

  const isWirelessCamera =
    (appState.device.microscope.selected !== null &&
      appState.device.microscope.selected?.connection.includes("WiFi")) ||
    ENVIRONMENT.MOCK_WIFI_MICROSCOPE === "true";

  const [selectedFunFact, setSelectedFunFact] = useState(
    Math.floor(Math.random() * 20)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFunFact(Math.floor(Math.random() * 20));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { mutateAsync: postCases, isPending: isLoadingPostCases } =
    useSpotlightScanAnotherConfirmationScalpPostCases();

  const handleClickNo = async () => {
    await postCases();
  };
  const handleClickYes = async () => {
    const payload: SpotlightScanStorageInterface = {
      index:
        (spotlightScan?.index ?? 0) + 1 >= 4
          ? spotlightScan?.index ?? 0
          : (spotlightScan?.index ?? 0) + 1,
      data:
        (spotlightScan?.index ?? 0) + 1 >= 4
          ? spotlightScan?.data ?? []
          : [
              ...(spotlightScan?.data ?? []),
              {
                order:
                  (!!globalScan?.data && !globalScan.data.length ? 4 : 6) +
                  (spotlightScan?.data ?? []).length +
                  1,
                id: -1,
                icon: "",
                image: "",
                region: "",
              },
            ],
    };
    await setSpotlightScan(payload);

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

    if ((spotlightScan?.index ?? 0) + 1 >= 4) {
      navigate(
        PrivateRouteURL.routeToCustomerScanCompletionConfirmationURL({
          locale: locale,
        })
      );
    } else {
      navigate(
        PrivateRouteURL.routeToCustomerScanSpotlightAreaURL({ locale: locale })
      );
    }
  };

  const isDinoLiteCamera =
    appState.device.microscope.selected?.name.includes("Dino-Lite") ||
    ENVIRONMENT.MOCK_DINO_LITE_MISCROSCOPE === "true";

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
                "w-full"
              )}
            >
              <p
                className={clsx("text-[2rem] text-white font-bold text-center")}
              >
                {dictionaries.confirmation.message}
              </p>

              <img
                src={"/illustrations/scalp-scan.illustration.svg"}
                alt={"spotlight-another-confirmation"}
              />
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 gap-x-[1.5rem]",
              "w-full",
              "box-border"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickNo}>
              {dictionaries.confirmation.actions.secondary.toUpperCase()}
            </Button>

            <Button disabled={isLoadingPostCases} onClick={handleClickYes}>
              {dictionaries.confirmation.actions.primary.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>

      <FunFactModalSpotlightAnotherScanConfirmation
        open={isLoadingPostCases}
        message={dictionaries.confirmation.fun_fact.message}
        description={dictionaries.confirmation.fun_fact.description}
        item={{
          title: dictionaries.confirmation.fun_fact.item.title,
          message: (
            appDictionaries.cases.fun_facts as { [key: string]: string }
          )[String(selectedFunFact)],
        }}
      />
      {!isDinoLiteCamera && !isWirelessCamera && (
        <div className={clsx("hidden")}>
          <USBMicroscopeCamera />
        </div>
      )}
    </AppContainer>
  );
};
