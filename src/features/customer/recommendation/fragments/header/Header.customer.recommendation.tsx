import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";

export const HeaderCustomerRecommendation = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  return (
    <p className={clsx("text-[1.5rem] text-white font-bold")}>
      {dictionaries.title}
    </p>
  );
};
