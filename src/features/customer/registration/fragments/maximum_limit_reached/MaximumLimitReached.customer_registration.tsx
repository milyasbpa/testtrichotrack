import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const MaximumLimitReachedCustomerRegistration = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <AppContainer>
      <div />

      <div
        className={clsx(
          "grid grid-cols-1 place-items-center place-content-center gap-[58px]",
          "relative"
        )}
      >
        <p className={clsx("text-center text-[2rem] text-white font-bold")}>
          {dictionaries.maximum_limit_reached.message}
        </p>
        <img src={dictionaries.maximum_limit_reached.src} />
        <p
          className={clsx(
            "text-center text-[1.25rem] text-white-60 font-normal"
          )}
        >
          {dictionaries.maximum_limit_reached.description}
        </p>
      </div>

      <Button
        href={PrivateRouteURL.routeToStaffHomeURL({ locale: locale })}
        variant="contained"
      >
        {dictionaries.maximum_limit_reached.cta.primary.children}
      </Button>
    </AppContainer>
  );
};
