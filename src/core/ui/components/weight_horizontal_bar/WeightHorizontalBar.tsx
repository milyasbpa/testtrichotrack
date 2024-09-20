import clsx from "clsx";

export interface WeightBarChartProps {
  name?: string;
  label?: string[];
  value?: number;
  style?: {
    backgroundColor: string;
    width: string;
  };
}

export const WeightBarChart = ({
  name = "",
  label = [],
  value = 0,
  style = {
    backgroundColor: "",
    width: "",
  },
}: WeightBarChartProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid place-content-start place-items-start gap-x-[1rem]",
          "grid-cols-[160px_1fr]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.875rem] text-white-80 font-bold text-center"
          )}
        >
          {name}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start",
            "w-full"
          )}
        >
          <div className={clsx("flex items-center justify-start", "w-full")}>
            {label.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "border-l border-l-spanish-gray",

                  index === label.length - 1
                    ? "border-r border-r-spanish-gray"
                    : "border-r border-r-transparent"
                )}
                style={{
                  width: `${100 / label.length}%`,
                }}
              >
                <p
                  className={clsx(
                    "text-[0.875rem] text-white-80 font-medium text-center"
                  )}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div
            className={clsx("h-[1.5rem]", "relative")}
            style={{
              backgroundColor: style.backgroundColor,
              width: style.width,
            }}
          >
            <p
              className={clsx(
                "text-[0.875rem] text-white-80 font-medium text-center",
                "absolute",
                "top-[50%] translate-y-[-50%] right-[5%]"
              )}
            >
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
