import clsx from "clsx";

import { getDictionaries } from "../i18n";
import { useParams } from "react-router-dom";
import { TiersTopUp } from "../fragments/tiers";
import {
  useTopupGetAvailableTiers,
  useTopupGetCurrentTier,
} from "../react_query/hooks";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Card } from "src/core/ui/components/card/Card";
import { Divider } from "src/core/ui/components/divider";

export const CompanyTopupContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  useTopupGetAvailableTiers();
  useTopupGetCurrentTier();

  return (
    <AppContainer>
      <Card
        elevation="2"
        className={clsx(
          "h-full",
          "flex flex-col justify-between items-center",
          "px-[1.5rem] py-[1.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-white text-[1.5rem] font-bold")}>
            {dictionaries.title}
          </p>
          <Divider />
          <TiersTopUp />
        </div>

        <Button
          variant="outlined"
          href={RouterFunctions.setBackURL({
            defaultURL: PrivateRouteURL.routeToCompanyBillingURL({
              locale: locale,
            }),
          })}
        >
          {dictionaries.cta.primary.children.toUpperCase()}
        </Button>
      </Card>
    </AppContainer>
  );
};
