import { useContext } from "react";
import { getDictionaries } from "../../i18n";
import { SkeletonSortPaymentHistory } from "../../components/skeleton_customer_sort";
import { ClientPaymentHistoryContext } from "../../contexts/ClientPaymentHistory.context";
import { ClientPaymentHistoryActionEnum } from "../../contexts/ClientPaymentHistory.types";
import { usePaymentHistoryGetPaymentRecords } from "../../react_query/hooks";
import { useParams } from "react-router-dom";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";
import clsx from "clsx";

export const SortPaymentHistory = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(ClientPaymentHistoryContext);
  const { isLoading: isLoadingGetPaymentHistory } =
    usePaymentHistoryGetPaymentRecords();

  const handleChangeSortBy = (data: { id: string; name: string }) => {
    dispatch({
      type: ClientPaymentHistoryActionEnum.SetListSortBy,
      payload: data.id,
    });
  };

  return (
    <>
      {isLoadingGetPaymentHistory && <SkeletonSortPaymentHistory />}

      {!isLoadingGetPaymentHistory && (
        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          {dictionaries.sort.items.map((item, index) => (
            <CheckboxButton
              key={index}
              checked={state.list.sort.by === item.id}
              label={item.name}
              value={item.id}
              onChange={() => handleChangeSortBy(item)}
            />
          ))}
        </div>
      )}
    </>
  );
};
