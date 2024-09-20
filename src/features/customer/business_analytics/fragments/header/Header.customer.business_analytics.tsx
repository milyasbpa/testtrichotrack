import clsx from "clsx";
import { Button } from "src/core/ui/components/button";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { useParams } from "react-router-dom";
import SVGIcon from "src/core/ui/icons";
import { getDictionaries } from "../../i18n";
import { RouterFunctions } from "src/core/utils/router/functions";

export const HeaderCustomerBusinessAnalytics = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <Button
        variant="icon"
        href={RouterFunctions.setBackURL({
          defaultURL: PrivateRouteURL.routeToStaffDashboardURL({
            locale: locale,
          }),
        })}
      >
        <SVGIcon
          name="Arrow"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-go-green")}
        />
      </Button>
      <h2 className={clsx("text-[1.5rem] text-white-87 font-bold text-start")}>
        {dictionaries.header.title}
      </h2>
    </div>
  );
};
