import clsx from "clsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.defaults.font.family = "Manrope";
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      // hide tooltip
      backgroundColor: "rgba(255,255,255,0)",
      titleColor: "rgba(255,255,255,0)",
      bodyColor: "rgba(255,255,255,0)",
      boxWidth: 0,
      boxHeight: 0,
    },
  },
};

const colorPalette = [
  "#01AC67",
  "#2E59C6",
  "#E84A27",
  "#FDB600",
  "#00A2FD",
  "#8439A8",
  "#742F75",
  "#D937B0",
  "#EAEA44",
  "#92EC37",
];

export interface GenderPieChartCustomerStatisticsProps {
  data?: number[];
  labels?: string[];
}

export const GenderPieChartCustomerStatistics = ({
  data = [],
  labels = [],
}: GenderPieChartCustomerStatisticsProps) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Gender",
        data: data,
        backgroundColor: colorPalette,
        borderColor: colorPalette,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={clsx("w-full")}>
      <div
        className={clsx(
          "grid grid-cols-2 w-full place-content-center place-items-center",
          "border-t border-t-granite-gray border-opacity-20",
          "border-b border-b-granite-gray border-opacity-20"
        )}
      >
        {labels.map((label, index) => (
          <div
            key={index}
            className={clsx(
              "grid grid-flow-col gap-x-[1rem] items-center content-center",
              "px-[1rem] py-[0.5rem]",
              labels !== undefined &&
                index < labels.length - 1 &&
                "border-r border-r-granite-gray border-opacity-20"
            )}
          >
            <div
              className={clsx("w-[1rem] h-[1rem] rounded-[50%]")}
              style={{ backgroundColor: colorPalette[index] }}
            />
            <div
              className={clsx(
                "grid grid-cols-1 gap-y-[0.25rem] place-content-start place-items-start"
              )}
            >
              <p
                className={clsx("text-[0.75rem] text-light-silver font-normal")}
              >
                {label}
              </p>
              <p className={clsx("text-[0.875rem] text-white font-bold")}>
                {!!data.length ? data[index] : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center w-full",
          "p-[1rem]"
        )}
      >
        <div className={clsx("w-[75%]")}>
          <Pie id={"gender-chart"} options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
};
