import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerScanGlobalCameraErrorContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  const handleClickTryAgain = () => {
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
                "grid grid-cols-1 justify-center justify-items-center gap-y-[108px]",
                "pt-[154px]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
                >
                  {dictionaries.message}
                </p>
                <p
                  className={clsx(
                    "text-[1.5rem] text-white font-medium text-center"
                  )}
                >
                  {dictionaries.description}
                </p>
              </div>

              <img src={dictionaries.image_url} />
            </div>
          </VerticalFlexGrow>

          <Button onClick={handleClickTryAgain}>
            {dictionaries.actions.primary.toUpperCase()}
          </Button>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
