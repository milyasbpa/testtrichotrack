import { useContext } from "react";
import { StaffListContext } from "../../contexts/StaffList.context";
import { useDisplayGetStaffs } from "../../react_query/hooks/useGetStaffs.list";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";

export const SortStaffList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffListContext);
  useDisplayGetStaffs();

  const handleChangeSortBy = (data: { id: string; name: string }) => {
    dispatch({
      type: StaffListActionEnum.SetData,
      payload: {
        ...state.data,
        sort: {
          ...state.data.sort,
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
          checked={state.data.sort.by === item.id}
          label={item.name}
          value={item.id}
          onChange={() => handleChangeSortBy(item)}
        />
      ))}
    </div>
  );
};
