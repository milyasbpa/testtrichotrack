import { useParams } from "react-router-dom";
import SVGIcon from "src/core/ui/icons";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { Button } from "src/core/ui/components/button";
import { RouterFunctions } from "src/core/utils/router/functions";
import { Dropdown } from "src/core/ui/components/dropdown";
import { useContext } from "react";
import {
  CustomerComparisonActionEnum,
  CustomerComparisonContext,
} from "../../context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";

export const HeaderCustomerComparison = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);
  const { state, dispatch } = useContext(CustomerComparisonContext);

  const handleSelectScreeningGroup = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerComparisonActionEnum.SetOptionsValue,
      payload: {
        ...state.options,
        selected: data.id === "image" ? null : data,
      },
    });
  };

  const viewOptions = [
    ...dictionaries.header.options.items,
    ...appDictionaries.cases.screening.group.items,
  ];
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start",
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
        <h2
          className={clsx("text-[1.5rem] text-white-87 font-bold text-start")}
        >
          {dictionaries.header.title}
        </h2>
      </div>

      <div className={clsx("w-[170px]")}>
        <Dropdown
          selected={
            !state.options.selected
              ? viewOptions.find((item) => item.id === "image") ?? null
              : viewOptions.find(
                  (item) => item.id === state.options.selected?.id
                ) ?? null
          }
          items={viewOptions}
          onSelect={handleSelectScreeningGroup}
        />
      </div>
    </div>
  );
};
