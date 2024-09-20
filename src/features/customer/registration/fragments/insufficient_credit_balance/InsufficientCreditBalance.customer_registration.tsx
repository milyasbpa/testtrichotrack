import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { AppContainer } from "src/core/modules/app/container";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Button } from "src/core/ui/components/button";

export const InsufficientCreditBalanceCustomerRegistration = () => {
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
          {dictionaries.insufficient_credit_balance.message}
        </p>
        <img src={dictionaries.insufficient_credit_balance.src} />
        <p
          className={clsx(
            "text-center text-[1.25rem] text-white-60 font-normal"
          )}
        >
          {dictionaries.insufficient_credit_balance.description}
        </p>
      </div>

      <Button
        variant="contained"
        href={PrivateRouteURL.routeToStaffHomeURL({
          locale: locale,
        })}
      >
        {dictionaries.insufficient_credit_balance.cta.primary.children}
      </Button>
    </AppContainer>
  );
};
