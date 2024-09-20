import clsx from "clsx";
import { ScanRawComparison } from "../fragments/items/Items.customer.comparison";
import { HeaderCustomerComparison } from "../fragments/header/Header.customer.comparison";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerComparisonContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <HeaderCustomerComparison />
          <VerticalFlexGrow>
            <ScanRawComparison />
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
