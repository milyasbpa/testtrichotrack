import clsx from "clsx";
import { HeaderStaffAdd } from "../fragments/header";
import { FormStaffAdd } from "../fragments/form";
import { AppContainer } from "src/core/modules/app/container";
import { Card } from "src/core/ui/components/card/Card";
import { Divider } from "src/core/ui/components/divider";
import { ConfirmationStaffAdd } from "../fragments/confirmation";
import { FooterStaffAdd } from "../fragments/footer";

export const StaffAddContainer = () => {
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
          <HeaderStaffAdd />
          <Divider />
          <div
            className={clsx(
              "flex flex-grow overflow-y-auto overflow-x-hidden",
              "w-full h-full"
            )}
          >
            <FormStaffAdd />
          </div>
          <FooterStaffAdd />
        </div>
      </Card>
      <ConfirmationStaffAdd />
    </AppContainer>
  );
};
