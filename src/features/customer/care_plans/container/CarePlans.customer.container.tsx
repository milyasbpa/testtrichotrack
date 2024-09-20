import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import {
  useCarePlansGetCarePlanById,
  useCustomerCarePlansGetDiagnosisOverview,
} from "../react_query/hooks";
import { Card } from "src/core/ui/components/card/Card";
import { HeaderCustomerCarePlans } from "../fragments/header";
import { DescriptionCustomerCarePlans } from "../fragments/description";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { StepsCustomerCarePlans } from "../fragments/steps";
import { ScheduleCustomerCarePlans } from "../fragments/schedule";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerCarePlansContainer = () => {
  const { isFetching: isFetchingGetDiagnosisOverview } =
    useCustomerCarePlansGetDiagnosisOverview();
  const { isFetching: isFetchingGetCarePlans } = useCarePlansGetCarePlanById();
  const isFetching = isFetchingGetCarePlans || isFetchingGetDiagnosisOverview;
  if (isFetching) {
    return null;
  }
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <HeaderCustomerCarePlans />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <DescriptionCustomerCarePlans />
              <StepsCustomerCarePlans />
              <ScheduleCustomerCarePlans />
            </div>
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
