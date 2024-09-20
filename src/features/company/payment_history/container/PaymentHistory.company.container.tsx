import { useParams } from "react-router-dom";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { PeriodFilterPaymentHistory } from "../fragments/period_filter";
import { SortPaymentHistory } from "../fragments/sort/Sort.payment_history";
import { HistoryPaymentHistory } from "../fragments/history/History.payment_history";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Card } from "src/core/ui/components/card/Card";

export const CompanyPaymentHistoryContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <AppContainer>
      <Card
        elevation="2"
        className={clsx(
          "p-[1.5rem]",
          "h-full",
          "!flex !flex-col !justify-between !items-start"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full"
            )}
          >
            <h2
              className={clsx(
                "text-[2rem] text-white-87 font-bold text-center"
              )}
            >
              {dictionaries.title}
            </h2>
          </div>

          <PeriodFilterPaymentHistory />

          <SortPaymentHistory />

          <HistoryPaymentHistory />
        </div>

        <Button
          variant={"outlined"}
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
