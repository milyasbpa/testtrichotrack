import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { useNavigate, useParams } from "react-router-dom";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const CustomerScanMaximumLimitReachedContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  const handleClickOK = () => {
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
                "grid grid-cols-1 place-items-center place-content-center gap-[58px]",
                "relative"
              )}
            >
              <p
                className={clsx("text-center text-[2rem] text-white font-bold")}
              >
                {dictionaries.message}
              </p>
              <img src={dictionaries.src} />
              <p
                className={clsx(
                  "text-center text-[1.25rem] text-white-60 font-normal"
                )}
              >
                {dictionaries.description}
              </p>
            </div>
          </VerticalFlexGrow>

          <Button onClick={handleClickOK}>
            {dictionaries.cta.primary.children}
          </Button>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
