import clsx from "clsx";
import { useHomeCaresGetHomeCareById } from "../react_query/hooks/useGetHomeCareById.home_cares";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { HeaderCustomerHomeCare } from "../fragments/header";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { DescriptionCustomerHomeCare } from "../fragments/description";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";
import { ProductCustomerHomeCare } from "../fragments/product";
import { IngredientsCustomerHomeCare } from "../fragments/ingredients";
import InstructionCustomerHomeCare from "../fragments/instruction/Instruction.customer.home_care";

export const CustomerHomeCareContainer = () => {
  useHomeCaresGetHomeCareById();
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <HeaderCustomerHomeCare />
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                "w-full h-full"
              )}
            >
              <DescriptionCustomerHomeCare />
              <ProductCustomerHomeCare />
              <IngredientsCustomerHomeCare />
              <InstructionCustomerHomeCare />
            </div>
          </VerticalFlexGrow>
        </VerticalFlexContainer>
      </Card>
    </AppContainer>
  );
};
