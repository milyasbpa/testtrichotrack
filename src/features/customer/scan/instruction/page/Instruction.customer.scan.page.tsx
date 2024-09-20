import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { useScanInstructionRemoveCompulsoryScan } from "../react_query/hooks/useRemoveCompulsoryScan.scan.instruction";
import { useScanInstructionRemoveSpotlightScan } from "../react_query/hooks/useRemoveSpotlightScan.scan.instruction";
import { useScanInstructionRemoveCompulsoryScanRetake } from "../react_query/hooks/useRemoveCompulsoryScanRetake.scan.instruction";
import { useScanInstructionRemovePartialScanImageInvalid } from "../react_query/hooks/useRemovePartialScanImageInvalid.scan.instruction";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { Button } from "src/core/ui/components/button";

export const CustomerScanInstructionPage = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  useScanInstructionRemoveCompulsoryScan();
  useScanInstructionRemoveCompulsoryScanRetake();
  useScanInstructionRemoveSpotlightScan();
  useScanInstructionRemovePartialScanImageInvalid();

  const handleClickNext = () => {
    navigate(
      PrivateRouteURL.routeToCustomerScanImageExamplesURL({ locale: locale })
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

    navigate(
      PrivateRouteURL.routeToCustomerScanGlobalAreaInstructionURL({
        locale: locale,
      })
    );
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
