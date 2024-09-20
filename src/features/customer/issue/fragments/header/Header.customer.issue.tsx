import { useParams } from "react-router-dom";
import SVGIcon from "src/core/ui/icons";
import clsx from "clsx";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { Button } from "src/core/ui/components/button";

export const HeaderCustomerIssue = () => {
  const { locale, diagnosis } = useParams();
  const appDictionaries = getAppDictionaries(locale);

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <Button
        variant="icon"
        // href={RouterFunctions.setBackURL({
        //   defaultURL: PrivateRouteURL.routeToCustomerDiagnosisURL({
        //     locale: locale,
        //   }),
        // })}
        href={PrivateRouteURL.routeToCustomerDiagnosisURL({
          locale: locale,
        })}
      >
        <SVGIcon
          name="Arrow"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-go-green")}
        />
      </Button>
      <h2 className={clsx("text-[1.5rem] text-white-87 font-bold text-start")}>
        {appDictionaries.cases.diagnosis.metric.items.find(
          (item) => item.id === diagnosis
        )?.name ?? ""}
      </h2>
    </div>
  );
};
