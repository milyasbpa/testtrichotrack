import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { ImageCardScanExamples } from "../components/image_card";
import { useScanExamplesGetScanExamples } from "../react_query/hooks/useGetScanExamples.scan_examples";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const CustomerScanExamplesPage = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();

  const { data: scanExamples } = useScanExamplesGetScanExamples();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickStart = () => {
    navigate(PrivateRouteURL.routeToCustomerScanRoutineURL({ locale: locale }));
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
              {dictionaries.examples.title}
            </h3>
          </div>

          <VerticalFlexGrow>
            <div className={clsx("grid grid-cols-2 gap-[1.5rem]", "w-full")}>
              {scanExamples &&
                scanExamples?.length > 0 &&
                scanExamples.map((item, index) => (
                  <ImageCardScanExamples
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
              "grid grid-cols-2 gap-x-[1.5rem] place-content-center place-items-center w-full"
            )}
          >
            <Button variant={"outlined"} onClick={handleClickBack}>
              {dictionaries.examples.actions.secondary.toUpperCase()}
            </Button>

            <Button onClick={handleClickStart}>
              {dictionaries.examples.actions.primary.toUpperCase()}
            </Button>
          </div>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
