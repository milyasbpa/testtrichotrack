import { useParams } from "react-router-dom";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";

export const HeaderCustomerList = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[0.5rem]",
        "w-full"
      )}
    >
      <h2 className={clsx("text-[1.5rem] text-white-87 font-bold text-start")}>
        {dictionaries.header.title}
      </h2>
    </div>
  );
};
