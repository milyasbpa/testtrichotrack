import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { OutletStaffDashboard } from "../fragments/outlet";
import { HomeStaffDashboard } from "../fragments/dashboard/Dashboard.staff.dashboard";
import { OutletFormStaffDashboard } from "../fragments/outlet_form/OutletForm.staff.dashboard";
import { Center } from "src/core/ui/layout/center";
import { Card } from "src/core/ui/components/card/Card";

export const StaffDashboardContainer = () => {
  return (
    <AppContainer>
      <Center>
        <Card
          elevation="1"
          className={clsx(
            "flex flex-col items-start justify-between",
            "w-full lg:max-w-[920px]",
            "rounded-[1.5rem]"
          )}
        >
          {/* outlet  */}
          <OutletStaffDashboard />
          {/* dashboard */}
          <Card
            elevation="2"
            className={clsx(
              "flex flex-col items-start justify-between",
              "w-full lg:max-w-[920px]",
              "gap-y-[1.5rem]",
              "p-[1.5rem]",
              "rounded-[1.5rem]"
            )}
          >
            <div
              className={clsx(
                "grid items-center content-center",
                "box-border",
                "w-full"
              )}
            >
              <HomeStaffDashboard />
            </div>
          </Card>
        </Card>
      </Center>
      <OutletFormStaffDashboard />
    </AppContainer>
  );
};
