import clsx from "clsx";
import { useParams } from "react-router-dom";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { RouterFunctions } from "src/core/utils/router/functions";
import { getDictionaries } from "../../i18n";

export const FooterCustomerList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full"
      )}
    >
      <Button
        variant={"outlined"}
        href={RouterFunctions.setBackURL({
          defaultURL: PrivateRouteURL.routeToStaffHomeURL({
            locale: locale,
          }),
        })}
      >
        {dictionaries.actions.back.toUpperCase()}
      </Button>
    </div>
  );
};
