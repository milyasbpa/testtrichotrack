import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { OutletStaffHome } from "../fragments/outlet";
import { DashboardStaffHome } from "../fragments/dashboard/Dashboard.home.staff";
import { OutletFormStaffHome } from "../fragments/outlet_form/OutletForm.home.staff";
import { Center } from "src/core/ui/layout/center";
import { Card } from "src/core/ui/components/card/Card";

export const StaffHomeContainer = () => {
  return (
    <AppContainer>
      <Center>
        <Card
          elevation="1"
          className={clsx(
            "flex flex-col items-start justify-between",
            "w-full lg:max-w-[920px]",
            "rounded-[1.5rem]",
          )}
        >
          {/* outlet  */}
          <OutletStaffHome />
          {/* dashboard */}
          <Card
            elevation="2"
            className={clsx(
              "flex flex-col items-start justify-between",
              "w-full lg:max-w-[920px]",
              "gap-y-[1.5rem]",
              "p-[1.5rem]",
              "rounded-[1.5rem]",
            )}
          >
            <div
              className={clsx(
                "grid items-center content-center",
                "box-border",
                "w-full"
              )}
            >
              <DashboardStaffHome />
            </div>
          </Card>
        </Card>
      </Center>
      <OutletFormStaffHome />
    </AppContainer>
  );
};
