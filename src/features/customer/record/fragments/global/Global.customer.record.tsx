import { useContext } from "react";
import clsx from "clsx";
import { GlobalNotFoundRecord } from "../../components/global_not_found/GlobalNotFound.record";
import {
  CustomerRecordActionEnum,
  CustomerRecordContext,
  CustomerRecordScan,
} from "../../context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { useCasesSetScanScreening } from "../../react_query/hooks";
import { ScanCardRecord } from "../../components/scan_card/ScanCard.record";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { AppContext } from "src/core/modules/app/context";

export const GlobalCustomerRecord = () => {
  const { locale } = useParams();

  const dictionaries = getDictionaries(locale);
  const appDictionaries = getAppDictionaries(locale);

  const { mutate: setScreening } = useCasesSetScanScreening();
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(CustomerRecordContext);

  const global = appState.cases.record.global;

  if (!global.length) {
    return (
      <GlobalNotFoundRecord
        message={dictionaries.no_global.message}
        description={dictionaries.no_global.description}
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
        "grid grid-cols-1 place-content-start place-items-start gap-x-[1.5rem] gap-y-[1.5rem]",
        "w-full"
      )}
    >
      {global.map((item, index) => (
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
          image_url={item.image}
          degree={0}
          onClick={() => handleSelectToDetail(item)}
        />
      ))}
    </div>
  );
};
