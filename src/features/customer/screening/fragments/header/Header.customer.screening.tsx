import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CustomerScreeningContext } from "../../context";
import { useDetailScreeningGetScreeningStorage } from "../../react_query/hooks";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import moment from "moment";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const HeaderCustomerScreening = () => {
  const { locale } = useParams();

  const appDictionaries = getAppDictionaries(locale);
  const { state } = useContext(CustomerScreeningContext);
  useDetailScreeningGetScreeningStorage();

  const stillUtc = moment.utc(state.scan.svc_time).toDate();
  const time = moment(stillUtc).local().format("DD MMM YYYY, h:mm A");
  const icon =
    appDictionaries.cases.region.items.find(
      (item) => item.id === state.scan.region
    )?.image_url ?? "";
  const region =
    appDictionaries.cases.region.items.find(
      (item) => item.id === state.scan.region
    )?.name ?? "";
  const date = time;
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-x-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-x-[0.5rem]"
        )}
      >
        <Button
          variant="icon"
          href={RouterFunctions.setBackURL({
            defaultURL: PrivateRouteURL.routeToCustomerRecordURL({
              locale,
            }),
          })}
        >
          <SVGIcon
            name="Arrow"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-go-green")}
          />
        </Button>
        <img src={icon} className={clsx("w-[2rem] h-[2rem]")} />
        <h3 className={clsx("text-[1.5rem] text-white font-bold")}>{region}</h3>
      </div>

      <p className={clsx("text-[1.25rem] text-white-60 font-regular")}>
        {date}
      </p>
    </div>
  );
};
