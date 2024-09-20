import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useIntersectionObserver } from "usehooks-ts";

import { CustomerListContext } from "../../contexts";
import {
  useListPostLoginByCustomerID,
  useUserCustomerListGetCustomers,
} from "../../react_query/hooks";
import { ItemCustomerList } from "../../components/item_list/ItemList.customer_list";
import { ItemNotFoundCustomerList } from "../../components/item_not_found";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const ItemsCustomerList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { ref, isIntersecting } = useIntersectionObserver();

  const { mutate: loginCustomerByID } = useListPostLoginByCustomerID();
  const { state } = useContext(CustomerListContext);
  const {
    isLoading: isLoadingGetCustomers,
    isFetching,
    fetchNextPage,
  } = useUserCustomerListGetCustomers();
  // const loaderList = Array.from({ length: 10 }, (_, i) => i + 1);

  const isEmptyGetCustomers =
    !isLoadingGetCustomers && !state.customers.list.length;

  useEffect(() => {
    if (isIntersecting && !isLoadingGetCustomers && !isEmptyGetCustomers) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  if (!isFetching && !state.customers.list.length) {
    return (
      <div className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full h-full")}>
        <ItemNotFoundCustomerList
          message={dictionaries.not_found.message}
          image_url={dictionaries.not_found.image_url}
        />
      </div>
    );
  }

  const handleClick = (data: { id: string }) => {
    loginCustomerByID(parseInt(data.id));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      {state.customers.list.map((item, index) => (
        <ItemCustomerList
          key={index}
          name={item.name}
          initial={item.initial}
          registration_time={item.registration_time}
          photo={item.photo}
          onClick={() => handleClick({ id: item.id })}
        />
      ))}
      <div ref={ref} className={clsx("opacity-0", "h-[0px]")}>
        {"Check Bottom"}
      </div>
    </div>
  );
};
