import clsx from "clsx";
import { HeaderOutletEdit } from "../fragments/header/Header.outlet.edit";
import { FormOutletEdit } from "../fragments/form/Form.outlet.edit";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { ConfirmationOutletEdit } from "../fragments/confirmation";
import { Divider } from "src/core/ui/components/divider";
import { FooterOutletEdit } from "../fragments/footer";

export const OutletEditContainer = () => {
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
          <HeaderOutletEdit />
          <Divider />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <FormOutletEdit />
          </div>
          <FooterOutletEdit />
        </div>
      </Card>
      <ConfirmationOutletEdit />
    </AppContainer>
  );
};
