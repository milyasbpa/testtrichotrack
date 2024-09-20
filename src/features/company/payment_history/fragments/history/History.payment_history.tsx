import { useContext } from "react";
import clsx from "clsx";

import { ClientPaymentHistoryContext } from "../../contexts/ClientPaymentHistory.context";
import { PaymentNotFoundPaymentHistory } from "../../components/payment_not_found";
import { ItemListPaymentHistory } from "../../components/item_list";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import {
  usePaymentHistoryGetPaymentRecords,
  usePaymentHistoryGetReceipt,
} from "../../react_query/hooks";
import moment from "moment";
import { LocaleRoute } from "src/core/utils/router/constants";
import { ListLoaderPaymentHistory } from "../../components/list_loader";

export const HistoryPaymentHistory = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state } = useContext(ClientPaymentHistoryContext);
  const { isFetching: isFetchingGetPaymentHistory } =
    usePaymentHistoryGetPaymentRecords();
  const { mutate: downloadReceipt } = usePaymentHistoryGetReceipt();
  const loaderList = Array.from({ length: 10 }, (_, i) => i + 1);

  const isFetching = isFetchingGetPaymentHistory;
  if (isFetching) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "max-h-[calc(100vh-124px-64px-64px-46px-72px-116px-124px)]",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        {loaderList.map((item) => (
          <ListLoaderPaymentHistory key={item} />
        ))}
      </div>
    );
  }

  if (!isFetching && !state.list.data.length) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "max-h-[calc(100vh-124px-64px-64px-46px-72px-116px-124px)]",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        <PaymentNotFoundPaymentHistory
          message={dictionaries.errors.no_payment_record.message}
        />
      </div>
    );
  }

  const handleDownload = (data: { name: string; link: string }) => {
    downloadReceipt(data);
  };

  const data =
    state.list.sort.by === "Latest Timestamp"
      ? state.list.data.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB.getTime() - dateA.getTime();
        })
      : state.list.data.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateA.getTime() - dateB.getTime();
        });

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[1.5rem]",
        "w-full h-full",
        "max-h-[calc(100vh-124px-64px-64px-46px-72px-116px-124px)]",
        "overflow-y-auto",
        "scrollbar-none"
      )}
    >
      {data.map((item, index) => {
        const stillUtc = moment.utc(item.timestamp).toDate();
        return (
          <ItemListPaymentHistory
            key={index}
            timestamp={moment(stillUtc).local().format("YYYY-MM-DD, HH:mm:ss")}
            picture={item.picture}
            name={item.tier_name[locale ?? LocaleRoute.default]}
            cta={{
              primary: {
                children: dictionaries.items.cta.primary.children,
                href: item.receipt,
                onClick: () =>
                  handleDownload({
                    link: item.receipt,
                    name: item.tier_name[locale ?? LocaleRoute.default],
                  }),
              },
            }}
          />
        );
      })}
    </div>
  );
};
