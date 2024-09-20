import { AppContainer } from "src/core/modules/app/container";
import clsx from "clsx";
import { FormSecretCompany } from "../fragments/form";
import { Card } from "src/core/ui/components/card/Card";
import { Center } from "src/core/ui/layout/center";

export const CompanySecretContainer = () => {
  return (
    <AppContainer>
      <Center>
        <Card elevation="2" className={clsx("p-[1.5rem]")}>
          <FormSecretCompany />
        </Card>
      </Center>
    </AppContainer>
  );
};
