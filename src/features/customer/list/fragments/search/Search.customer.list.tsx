import React, { useContext } from "react";
import { Textfield } from "src/core/ui/components/textfield";
import { CustomerListActionEnum, CustomerListContext } from "../../contexts";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { useUserCustomerListGetCustomers } from "../../react_query/hooks/useGetCustomers.customer.list";

export const SearchCustomerList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerListContext);

  useUserCustomerListGetCustomers();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CustomerListActionEnum.SetSearchValue,
      payload: e.currentTarget.value,
    });
  };

  return (
    <Textfield
      placeholder={dictionaries.search_input.placeholder}
      value={state.customers.search.value}
      onChange={handleChangeSearch}
    />
  );
};
