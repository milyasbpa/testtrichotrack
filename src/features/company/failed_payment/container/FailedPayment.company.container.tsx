import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { useParams } from "react-router-dom";

import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CompanyFailedPaymentContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <div />

          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-items-center place-content-center gap-[60px]",
                "relative"
              )}
            >
              <p
                className={clsx("text-center text-[2rem] text-white font-bold")}
              >
                {dictionaries.message}
              </p>

              <img src={dictionaries.src} />
            </div>
          </VerticalFlexGrow>

          <Button
            variant="contained"
            href={PrivateRouteURL.routeToCompanyBillingURL({ locale: locale })}
          >
            {dictionaries.cta.primary.children}
          </Button>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
