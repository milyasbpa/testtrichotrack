import clsx from "clsx";
import { AppContainer } from "src/core/modules/app/container";
import { FormLoginCustomer } from "../fragments/form";
import { Center } from "src/core/ui/layout/center";
import { Card } from "src/core/ui/components/card/Card";

export const CustomerLoginContainer = () => {
  return (
    <AppContainer>
      <Center>
        <Card elevation="2">
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start  gap-y-[1.5rem]",
              "w-full",
              "px-[1.5rem] py-[1.5rem]"
            )}
          >
            <FormLoginCustomer />
          </div>
        </Card>
      </Center>
    </AppContainer>
  );
};
