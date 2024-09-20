import clsx from "clsx";
import { useParams } from "react-router-dom";
import { Button } from "src/core/ui/components/button";
import { getDictionaries } from "../../i18n";
import { useContext } from "react";
import { CustomerRecordContext } from "../../context";
import { useCasesSetScanComparisonItems } from "../../react_query/hooks";

export const FooterCustomerRecord = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CustomerRecordContext);
  const { mutate: compare } = useCasesSetScanComparisonItems();

  if (state.comparison.data.length < 2) {
    return null;
  }

  const compareText = `${dictionaries.actions.compare.toUpperCase()} ${
    state.comparison.data.length
  }`;

  const handleClickCompare = () => {
    compare();
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full"
      )}
    >
      <Button onClick={handleClickCompare}>{compareText}</Button>
    </div>
  );
};
