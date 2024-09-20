import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const xAxisTickColor = () => {
  const result = "rgba(255,255,255,0.8)";
  return result;
};

const yAxisTickColor = (value: string) => {
  const result =
    value === "0"
      ? "#DB3E4D"
      : value === "1"
      ? "#DB3E4D"
      : value === "2"
      ? "#F59179"
      : value === "3"
      ? "#F5CE71"
      : value === "4"
      ? "#F5E871"
      : value === "5"
      ? "#36A692"
      : "#FFFFFF";
  return result;
};

export interface LineChartDiagnosisProps {
  labels?: string[];
  categories?: {
    label: string;
    data: number[];
    color: string;
  }[];
}

export const LineChartDiagnosis = ({
  categories = [],
  labels = [],
}: LineChartDiagnosisProps) => {
  const finalData = {
    labels: labels,
    datasets: categories.map((item) => {
      return {
        label: item.label,
        data: item.data,
        borderColor: item.color,
        pointBorderWidth: 6,
        backgroundColor: item.color,
      };
    }),
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: () => {
            return "#999999";
          },
        },
        ticks: {
          stepSize: 1,
          color: () => {
            const result = xAxisTickColor();
            return result;
          },
          font: {
            size: 14,
            fontWeight: 500,
          },
        },
      },
      y: {
        // max: 5,
        grid: {
          color: () => {
            return "#999999";
          },
        },
        ticks: {
          stepSize: 1,
          color: (value: any) => {
            const result = yAxisTickColor(value?.tick?.label);
            return result;
          },

          font: {
            size: 18,
            fontWeight: 500,
          },
        },
      },
    },
  };
  return <Line options={options} data={finalData} />;
};
