import clsx from "clsx";

import { ItemsCustomerRecommendation } from "../fragments/items/Items.customer.recommendation";
import { AppContainer } from "src/core/modules/app/container";
import { FlowCustomerRecommendation } from "../fragments/flow";
import { HeaderCustomerRecommendation } from "../fragments/header";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CustomerRecommendationContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <FlowCustomerRecommendation />
          <HeaderCustomerRecommendation />
          <VerticalFlexGrow>
            <ItemsCustomerRecommendation />
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
