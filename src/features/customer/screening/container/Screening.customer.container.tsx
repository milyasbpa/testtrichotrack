import { useContext } from "react";
import clsx from "clsx";
import { CustomerScreeningContext } from "../context/Screening.customer.context";
import { DetailAnnotationScreening } from "../fragments/annotations/Annotations.customer.screening";
import { HeaderCustomerScreening } from "../fragments/header/Header.customer.screening";
import { GlobalCustomerScreening } from "../fragments/global/Global.customer.screening";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { GroupCustomerScreening } from "../fragments/group";
import { ScreeningCustomerScreening } from "../fragments/screening";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerScreeningContainer = () => {
  const { state } = useContext(CustomerScreeningContext);

  if (
    state.scan.region === "Frontal Overhead" ||
    state.scan.region === "Rear Overhead"
  ) {
    return (
      <AppContainer>
        <Card elevation="2" className={clsx("h-full")}>
          <VerticalFlexContainer>
            {/* header */}
            <HeaderCustomerScreening />

            {/* body */}
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
                "w-full"
              )}
            >
              <GlobalCustomerScreening />
            </div>
          </VerticalFlexContainer>
        </Card>
      </AppContainer>
    );
  }
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <HeaderCustomerScreening />
          <GroupCustomerScreening />

          {/* body */}
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
                "w-full"
              )}
            >
              <DetailAnnotationScreening />
              <ScreeningCustomerScreening />
            </div>
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
