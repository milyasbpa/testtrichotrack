import React from "react";
import clsx from "clsx";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import SVGIcon from "src/core/ui/icons";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const tickColor = (value: string) => {
  const result =
    value === "0"
      ? "#DB3E4D"
      : value === "1"
      ? "#DB3E4D"
      : value === "2"
      ? "#F59179"
      : value === "3"
      ? "#E8AE23"
      : value === "4"
      ? "#F5E871"
      : value === "5"
      ? "#36A692"
      : "#FFFFFF";
  return result;
};

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    //
  },
  scale: {
    ticks: {
      callback: () => {
        return "";
      },
    },
  },
  scales: {
    r: {
      max: 5,
      beginAtZero: true,
      grid: {
        color: () => {
          return "#666666";
        },
      },
      pointLabels: {
        font: {
          size: 10,
        },
      },
      ticks: {
        stepSize: 1,
        showLabelBackdrop: false,
        color: (value: any) => {
          const result = tickColor(value?.tick?.label);
          return result;
        },
        font: {
          size: 10,
          fontWeight: 600,
        },
      },
    },
  },
};

export interface RadarChartProps {
  data?: {
    id: string;
    label: {
      name: string;

      position: {
        top: string;
        left: string;
      };
      text: {
        position: string; // "left" | "right" | "top" | "bottom";
      };

      icon: {
        name: string;
        color: string;
      };
    };
    value: number;
  }[];
  onClick?: (data: { value: string }) => void;
}

export const RadarChart = ({
  data = [],
  // labels = [],
  onClick = () => {},
}: RadarChartProps) => {
  const dataMap = {
    labels: data.map(() => ""),
    datasets: [
      {
        label: "Case",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(185, 255, 226, 0.2)",
        borderColor: "#017948",
        borderWidth: 1,
      },
    ],
  };
  const handleClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick({ value: e.currentTarget.value });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-items-center justify-center",
        "w-full",
        "max-h-[576px]",
        "relative"
      )}
    >
      {data.map((item, index) => (
        <button
          key={index}
          className={clsx("absolute", "cursor-pointer")}
          style={{
            top: item.label.position.top,
            left: item.label.position.left,
          }}
          value={item.id}
          onClick={handleClickCategory}
        >
          <div
            className={clsx(
              "flex items-center justify-start gap-[0.5rem]",
              "relative",
              item.label.text.position === "top"
                ? "flex-col-reverse"
                : item.label.text.position === "bottom"
                ? "flex-col"
                : item.label.text.position === "left"
                ? "flex-row-reverse"
                : "flex-row"
            )}
          >
            <SVGIcon
              name={item.label.icon.name as any}
              className={clsx("w-[0.75rem] h-[0.75rem]")}
              style={{
                fill: item.label.icon.color,
              }}
            />

            <p
              className={clsx(
                "text-[0.625rem] ",
                "text-granite-gray hover:text-go-green",
                "font-medium hover:font-bold",
                item.label.text.position === "top"
                  ? "text-center"
                  : item.label.text.position === "bottom"
                  ? "text-center"
                  : item.label.text.position === "left"
                  ? "text-right"
                  : "text-left"
              )}
              dangerouslySetInnerHTML={{ __html: item.label.name ?? "" }}
            />
          </div>
        </button>
      ))}

      <p
        className={clsx(
          "absolute top-[50%] left-[50%]",
          "translate-x-[-50%] translate-y-[-20%]",
          "text-[1.25rem] text-jasper font-medium"
        )}
      >
        {"0"}
      </p>

      <Radar options={options} data={dataMap} />
    </div>
  );
};
