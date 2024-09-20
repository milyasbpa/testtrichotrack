import { useContext } from "react";
import { OutletListActionEnum, OutletListContext } from "../../contexts";
import clsx from "clsx";
import { useDisplayGetOutlets } from "../../react_query/hooks";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { CheckboxButton } from "src/core/ui/components/checkbox_button";

export const SortOutletList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(OutletListContext);
  useDisplayGetOutlets();

  const handleChangeSortBy = (data: { id: string; name: string }) => {
    dispatch({
      type: OutletListActionEnum.SetSortByValue,
      payload: data.id,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
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
