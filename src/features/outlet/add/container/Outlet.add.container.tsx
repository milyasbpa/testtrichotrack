import clsx from "clsx";
import { HeaderOutletAdd } from "../fragments/header/Header.outlet.add";
import { FormOutletAdd } from "../fragments/form/Form.outlet.add";
import { useAddOutletGetOutlets } from "../react_query/hooks/useGetOutlets.add";
import { AppContainer } from "src/core/modules/app/container";
import { Divider } from "src/core/ui/components/divider";
import { Card } from "src/core/ui/components/card/Card";
import { ConfirmationOutletAdd } from "../fragments/confirmation";
import { FooterOutletAdd } from "../fragments/footer";

export const OutletAddContainer = () => {
  useAddOutletGetOutlets();

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
          <HeaderOutletAdd />
          <Divider />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <FormOutletAdd />
          </div>
          <FooterOutletAdd />
        </div>
      </Card>
      <ConfirmationOutletAdd />
    </AppContainer>
  );
};
