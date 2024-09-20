import clsx from "clsx";
import { useParams } from "react-router-dom";
import { CustomerRegistrationBusinessAnalytics } from "../fragments/customer_registration/CustomerRegistration.business_analytics";
import { CustomerVisitDistributionBusinessAnalytics } from "../fragments/customer_visit_distribution/CustomerVisitDistribution.business_analytics";
import { CustomerVisitBusinessAnalytics } from "../fragments/customer_visit/CustomerVisit.business_analytics";
import { CustomerFilterBusinessAnalytics } from "../fragments/customer_filter/CustomerFilter.business_analytics";
import { useCustomerBusinessAnalyticsGetOutlets } from "../react_query/hooks/useGetOutlets.business_analytics";
import { ReportRequestBusinessAnalytics } from "../fragments/report_request/ReportRequest.business_analytics";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries } from "../i18n";
import { HeaderCustomerBusinessAnalytics } from "../fragments/header/Header.customer.business_analytics";
import { AppContainer } from "src/core/modules/app/container";
import { RouterFunctions } from "src/core/utils/router/functions";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerBusinessAnalyticsContainer = () => {
  useCustomerBusinessAnalyticsGetOutlets();

  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <HeaderCustomerBusinessAnalytics />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
                )}
              >
                <CustomerVisitDistributionBusinessAnalytics />
              </div>

              <CustomerFilterBusinessAnalytics />

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
                )}
              >
                <CustomerRegistrationBusinessAnalytics />
              </div>

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
                )}
              >
                <CustomerVisitBusinessAnalytics />
              </div>

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[1.5rem]"
                )}
              >
                <ReportRequestBusinessAnalytics />
              </div>
            </div>
          </VerticalFlexGrow>

          <Button
            href={RouterFunctions.setBackURL({
              defaultURL: PrivateRouteURL.routeToStaffDashboardURL({
                locale: locale,
              }),
            })}
            variant={"outlined"}
          >
            {dictionaries.actions.back.toUpperCase()}
          </Button>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
