import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { FormNotificationPreferences } from "../fragments/form";
import { AppContainer } from "src/core/modules/app/container";
import { useParams } from "react-router-dom";
import { Card } from "src/core/ui/components/card/Card";
import { Center } from "src/core/ui/layout/center";

export const CompanyNotificationPreferencesContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <AppContainer>
      <Center>
        <Card elevation="2">
          {/* start container */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "px-[1.5rem] py-[1.5rem]"
            )}
          >
            <p className={clsx("text-white text-[1.5rem] font-bold")}>
              {dictionaries.title}
            </p>

            {/* divider */}
            <div className={clsx("w-full h-[1px]", "bg-white-12")} />
            {/* end divider */}

            <FormNotificationPreferences />

            {/* end save */}
          </div>

          {/* end container */}
        </Card>
      </Center>
    </AppContainer>
  );
};
