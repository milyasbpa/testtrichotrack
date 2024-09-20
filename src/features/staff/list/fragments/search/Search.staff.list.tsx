import React, { useContext } from "react";
import clsx from "clsx";
import { Textfield } from "src/core/ui/components/textfield";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { StaffListContext } from "../../contexts/StaffList.context";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { useDisplayGetStaffs } from "../../react_query/hooks/useGetStaffs.list";

export const SearchStaffList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffListContext);
  useDisplayGetStaffs();

  const handleChangeSearchCustomer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: StaffListActionEnum.SetSearchValue,
      payload: e.target.value,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start w-full gap-y-[0.5rem]"
      )}
    >
      <Textfield
        label={dictionaries.search_input.label}
        placeholder={dictionaries.search_input.placeholder}
        value={state.data.search.value}
        debounce
        onChange={handleChangeSearchCustomer}
      />
    </div>
  );
};
