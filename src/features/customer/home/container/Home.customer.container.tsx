import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { DashboardCustomerHome } from "../fragments/dashboard/Dashboard.customer.home";
import { Center } from "src/core/ui/layout/center";
import { Card } from "src/core/ui/components/card/Card";

export const CustomerHomeContainer = () => {
  return (
    <AppContainer>
      <Center>
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
            <DashboardCustomerHome />
          </div>
        </Card>
      </Center>
    </AppContainer>
  );
};
