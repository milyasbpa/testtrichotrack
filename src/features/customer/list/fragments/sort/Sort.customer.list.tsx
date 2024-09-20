import { useContext } from "react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { CustomerListActionEnum, CustomerListContext } from "../../contexts";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";

export const SortCustomerList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerListContext);

  const handleChangeSortBy = (data: { id: string; name: string }) => {
    dispatch({
      type: CustomerListActionEnum.SetCustomersData,
      payload: {
        ...state.customers,
        sort: {
          ...state.customers.sort,
          by: data.id,
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      {dictionaries.sort.items.map((item, index) => (
        <CheckboxButton
          key={index}
          checked={state.customers.sort.by === item.id}
          label={item.name}
          value={item.id}
          onChange={() => handleChangeSortBy(item)}
        />
      ))}
    </div>
  );
};
