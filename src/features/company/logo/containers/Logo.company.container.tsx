import { HeaderCompanyLogo } from "../fragments/header";
import { FormCompanyLogo } from "../fragments/form/Form.company.logo";
import { PopupCompanyLogo } from "../fragments/popup";
import { AppContainer } from "src/core/modules/app/container";
import { Divider } from "src/core/ui/components/divider";
import clsx from "clsx";
import { FooterCompanyLogo } from "../fragments/footer/Footer.company.logo";
import { Card } from "src/core/ui/components/card/Card";
import { VerticalFlexContainer } from "src/core/ui/layout/vertical_flex_container";
import { VerticalFlexGrow } from "src/core/ui/layout/vertical_flex_grow";

export const CompanyLogoContainer = () => {
  return (
    <AppContainer>
      <Card elevation="2" className={clsx("h-full")}>
        <VerticalFlexContainer>
          <VerticalFlexGrow>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <HeaderCompanyLogo />
              <Divider />
              <FormCompanyLogo />
            </div>
          </VerticalFlexGrow>
          <FooterCompanyLogo />
        </VerticalFlexContainer>
      </Card>
      <PopupCompanyLogo />
    </AppContainer>
  );
};
