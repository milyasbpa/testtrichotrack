import clsx from "clsx";
import SVGIcon from "../../icons";

export interface ColorGradientBarProps {
  data?: {
    id: string;
    name: string;
    color: string;
  }[];
  value?: number;
}

export const ColorGradientBar = ({
  data = [],
  value = 0, //value 0-100
}: ColorGradientBarProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "w-full h-[1rem]",
          "rounded-[1.5rem]",
          "flex items-center justify-start",
          "relative"
        )}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "h-[1rem]",
              index === 0
                ? "rounded-tl-[0.5rem] rounded-bl-[0.5rem]"
                : index === data.length - 1
                ? "rounded-tr-[0.5rem] rounded-br-[0.5rem]"
                : "rounded-[0px]"
            )}
            style={{
              width: `${100 / data.length}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
        <div
          className={clsx(
            "absolute",
            "z-[10]",
            "translate-x-[-7.5px] translate-y-[-2px]"
          )}
          style={{ left: `${value}%` }}
        >
          <SVGIcon name="Triangle" className={clsx("fill-[white]")} />
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center flex-wrap gap-[0.5rem]",
            "w-full max-w-[80%]"
          )}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[0.5rem]"
              )}
            >
              <div
                className={clsx("w-[0.75rem] h-[0.75rem]", "rounded-[50%]")}
                style={{ backgroundColor: item.color }}
              />
              <p className={clsx("text-[0.75rem] text-[white] font-semibold")}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
