import clsx from "clsx";

export const DayNamesBoxBusinessAnalytics = () => {
  // const { abbreviatedDayNameListTranslator } = useTranslateDay();
  const abbreviatedDayNameListTranslator = [] as string[];
  return (
    <div
      className={clsx(
        "grid grid-cols-7 w-full place-content-center place-items-center"
      )}
    >
      {abbreviatedDayNameListTranslator.map((day) => (
        <div className={"flex items-center justify-center w-full"} key={day}>
          <p className={clsx("text-[0.75rem] font-bold text-white")}>{day}</p>
        </div>
      ))}
    </div>
  );
};
