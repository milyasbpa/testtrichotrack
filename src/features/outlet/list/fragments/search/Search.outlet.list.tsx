import React, { useContext } from "react";
import clsx from "clsx";
import { OutletListActionEnum, OutletListContext } from "../../contexts";
import { useDisplayGetOutlets } from "../../react_query/hooks";
import { Textfield } from "src/core/ui/components/textfield";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const SearchOutletList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(OutletListContext);
  useDisplayGetOutlets();

  const handleChangeSearchCustomer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: OutletListActionEnum.SetSearchValue,
      payload: e.currentTarget.value,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.5rem]"
      )}
    >
      <p className={clsx("text-white text-[0.75rem] font-bold")}>
        {dictionaries.search_input.label}
      </p>
      <Textfield
        placeholder={dictionaries.search_input.placeholder}
        value={state.data.search.value}
        onChange={handleChangeSearchCustomer}
      />
    </div>
  );
};
