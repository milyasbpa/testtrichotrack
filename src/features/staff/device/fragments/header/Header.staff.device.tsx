
import {  useParams } from "react-router-dom";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";

export const HeaderStaffDevice = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  return (
    <div className={clsx("grid grid-cols-1 gap-y-[1.5rem]")}>
      <h2 className={clsx("text-[2rem] text-white-87 font-bold text-start")}>
        {dictionaries.header.title}
      </h2>
      <h3 className={clsx("text-[1.5rem] text-white-87 font-bold text-start")}>
        {dictionaries.header.subtitle}
      </h3>
    </div>
  );
};
