import clsx from "clsx";
import { HeaderOutletView } from "../fragments/header/Header.outlet.view";
import { FormOutletView } from "../fragments/form/OutletForm.view";
import { AppContainer } from "src/core/modules/app/container";
import { Divider } from "src/core/ui/components/divider";
import { Card } from "src/core/ui/components/card/Card";

export const OutletViewContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <div
          className={clsx(
            "flex flex-col items-start justify-start gap-[1.5rem]",
            "w-full h-full",
            "px-[1.5rem] py-[1.5rem]"
          )}
        >
          <HeaderOutletView />
          <Divider />
          <FormOutletView />
        </div>
      </Card>
    </AppContainer>
  );
};
