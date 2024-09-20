import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { useGlobalScanInstructionRemoveCompulsoryScan } from "../react_query/hooks/useRemoveCompulsoryScan.scan.global_instruction";
import { useGlobalScanInstructionRemoveSpotlightScan } from "../react_query/hooks/useRemoveSpotlightScan.scan.global_instruction";
import { useGlobalScanInstructionRemoveCompulsoryScanRetake } from "../react_query/hooks/useRemoveCompulsoryScanRetake.scan.global_instruction";
import { useGlobalScanInstructionRemovePartialScanImageInvalid } from "../react_query/hooks/useRemovePartialScanImageInvalid.scan.global_instruction";
import { useGlobalScanInstructionRemoveGlobalScan } from "../react_query/hooks/useRemoveGlobalScan.scan.global_instruction";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import clsx from "clsx";
import { Button } from "src/core/ui/components/button";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerScanGlobalInstructionPage = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  useGlobalScanInstructionRemoveCompulsoryScan();
  useGlobalScanInstructionRemoveCompulsoryScanRetake();
  useGlobalScanInstructionRemoveSpotlightScan();
  useGlobalScanInstructionRemovePartialScanImageInvalid();
  useGlobalScanInstructionRemoveGlobalScan();

  const handleClickNext = () => {
    navigate(
      PrivateRouteURL.routeToCustomerScanGlobalImageExamplesURL({
        locale: locale,
      })
    );
  };

  const handleClickBack = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      const mediaStream = video.srcObject;
      const tracks = (mediaStream as any).getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    });
    navigate(PrivateRouteURL.routeToCustomerHomeURL({ locale: locale }));
  };
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div />

          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-items-center place-content-center",
                "relative"
              )}
            >
              <p
                className={clsx("text-center text-[2rem] text-white font-bold")}
              >
                {dictionaries.message}
              </p>

              <img src={dictionaries.image_url} />

              <p
                className={clsx(
                  "text-center text-[1.25rem] text-white font-regular"
                )}
              >
                {dictionaries.description}
              </p>
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 place-content-center place-items-center gap-[1.5rem]",

              "w-full"
            )}
          >
            <Button variant="outlined" onClick={handleClickBack}>
              {dictionaries.actions.secondary.toUpperCase()}
            </Button>
            <Button variant="contained" onClick={handleClickNext}>
              {dictionaries.actions.primary.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
