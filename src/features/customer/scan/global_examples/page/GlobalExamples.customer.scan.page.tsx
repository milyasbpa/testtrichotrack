import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { ImageCardGlobalScanExamples } from "../components/image_card";
import { useGlobalScanExamplesGetScanExamples } from "../react_query/hooks/useGetScanExamples.global_scan_examples";
import { useGlobalScanExamplesSetGlobalScan } from "../react_query/hooks/useSetGlobalScan.scan.global_scan_examples";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { Button } from "src/core/ui/components/button";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerScanGlobalExamplesPage = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { data: scanExamples } = useGlobalScanExamplesGetScanExamples();
  const { mutate: setGlobalScan } = useGlobalScanExamplesSetGlobalScan();

  const handleClickBack = () => {
    setGlobalScan({ skip: true });
  };

  const handleClickStart = () => {
    setGlobalScan({ skip: false });
  };
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1.5rem]",
              "w-full"
            )}
          >
            <h3
              className={clsx("text-[2rem] text-white font-bold text-center")}
            >
              {dictionaries.title}
            </h3>
          </div>
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-2 gap-x-[1.5rem] gap-y-[1.5rem] w-full"
              )}
            >
              {scanExamples &&
                scanExamples?.length > 0 &&
                scanExamples.map((item, index) => (
                  <ImageCardGlobalScanExamples
                    key={index}
                    image={item.photo}
                    description={item.description}
                    type={item.type}
                  />
                ))}
            </div>
          </VerticalFlexGrow>

          <div
            className={clsx(
              "grid grid-cols-2 gap-[1.5rem] place-content-center place-items-center",
              "w-full"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.actions.secondary.toUpperCase()}
            </Button>

            <Button onClick={handleClickStart}>
              {dictionaries.actions.primary.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
