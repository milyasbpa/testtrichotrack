import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const ScalpScanErrorContainer = () => {
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
                "grid grid-cols-1 justify-center justify-items-center",
                "w-full",
                "pt-[154px]"
              )}
            >
              <div>
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
                  )}
                >
                  {dictionaries.message}
                </p>
                <p
                  className={clsx(
                    "text-[2rem] text-white font-bold text-center"
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
