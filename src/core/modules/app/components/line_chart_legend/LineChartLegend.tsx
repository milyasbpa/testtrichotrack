import clsx from "clsx";

export interface LineChartLegendProps {
  title?: string;
  data?: {
    id: string;
    name: string;
    color: string;
  }[];
}

export const LineChartLegend = ({
  title = "",
  data = [],
}: LineChartLegendProps) => {
  const groupNumber = 2;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
        "w-full"
      )}
    >
      {!!title.length && (
        <h3 className={clsx("text-[1.5rem] text-white font-semibold")}>
          {title}
        </h3>
      )}

      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-x-[1.5rem]",
          "w-full"
        )}
      >
        {Array.from({ length: groupNumber }, (_, i) => i).map((i) => (
          <div
            key={i}
            className={clsx(
              "border border-granite-gray",
              "rounded-[0.5rem]",
              "w-full"
            )}
          >
            {data
              .slice(
                (data.length / groupNumber) * i,
                (data.length / groupNumber) * (i + 1)
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "px-[0.5rem] py-[0.75rem]",
                    "flex items-center justify-start gap-x-[0.5rem]",
                    index <= data.length - 1
                      ? "border-b border-b-granite-gray"
                      : "border-b-[0px] border-b-granite-gray"
                  )}
                >
                  <div
                    className={clsx("relative", "w-[1.25rem] h-[0.25rem]")}
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    <div
                      className={clsx(
                        "absolute top-[50%] left-[50%]",
                        "translate-x-[-50%] translate-y-[-50%]",
                        "w-[0.5rem] h-[0.5rem]",
                        "rounded-[50%]",
                        "z-10"
                      )}
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  <p
                    className={clsx(
                      "text-[0.625rem] text-white-80 font-regular text-left"
                    )}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
