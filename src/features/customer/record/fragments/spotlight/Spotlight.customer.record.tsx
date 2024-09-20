import { useContext } from "react";
import clsx from "clsx";
import {
  CustomerRecordActionEnum,
  CustomerRecordContext,
  CustomerRecordScan,
} from "../../context";
import { useCasesSetScanScreening } from "../../react_query/hooks";
import { SpotlightNotFoundRecord } from "../../components/spotlight_not_found";
import { useParams } from "react-router-dom";
import { ScanCardRecord } from "../../components/scan_card";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { AppContext } from "src/core/modules/app/context";

export const SpotlightCustomerRecord = () => {
  const { locale } = useParams();

  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { mutate: setScreening } = useCasesSetScanScreening();
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerRecordContext);

  const spotlight = appState.cases.record.spotlight;

  if (!spotlight.length) {
    return (
      <SpotlightNotFoundRecord
        message={dictionaries.no_spotlight.message}
        description={dictionaries.no_spotlight.description}
      />
    );
  }

  const handleSelect = (data: CustomerRecordScan) => {
    const isExist = state.comparison.data.find((item) => item.id === data.id);
    dispatch({
      type: CustomerRecordActionEnum.SelectScanToCompare,
      payload: isExist
        ? state.comparison.data.filter((item) => item.id !== data.id)
        : [
            ...state.comparison.data,
            {
              ...data,
              svc_time: appState.cases.data.selected?.svc_time ?? "",
              svc_time_id: appState.cases.data.selected?.id ?? "",
            },
          ],
    });
  };

  const handleSelectToDetail = (data: CustomerRecordScan) => {
    setScreening({
      ...data,
      svc_time: appState.cases.data.selected?.svc_time ?? "",
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start gap-x-[1.5rem] gap-y-[1.5rem]",
        "w-full"
      )}
    >
      {spotlight.map((item, index) => (
        <ScanCardRecord
          key={index}
          id={item.id}
          header={{
            region:
              appDictionaries.cases.region.items.find(
                (regionItem) => regionItem.id === item.region
              )?.name ?? "",
            image_url:
              appDictionaries.cases.region.items.find(
                (regionItem) => regionItem.id === item.region
              )?.image_url ?? "",
            checkbox: {
              checked:
                state.comparison.data.filter(
                  (cacheItem) => cacheItem.id === item.id
                ).length > 0,
              onChange: () => handleSelect(item),
            },
            select:
              state.comparison.data.length < 4 ||
              (state.comparison.data.some(
                (selectionItem) => selectionItem.id === item.id
              ) &&
                state.comparison.data.length === 4),
            cta: {
              primary: {
                children: dictionaries.actions.compare,
              },
            },
          }}
          degree={90}
          image_url={item.image}
          onClick={() => handleSelectToDetail(item)}
        />
      ))}
    </div>
  );
};
