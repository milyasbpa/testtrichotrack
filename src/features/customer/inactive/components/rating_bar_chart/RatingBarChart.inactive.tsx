import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const ratingLabels = {
  id: "ratingLabels",
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;

    if (chart.canvas.id === "rating-chart") {
      ctx.font = "bold 10px Manrope";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      let maximumValue = 0;
      for (let i = 0; i < chart.data.datasets.length; i++) {
        maximumValue =
          maximumValue < Math.max(...chart.data.datasets[i].data)
            ? Math.max(...chart.data.datasets[i].data)
            : maximumValue;
      }

      for (let i = 0; i < chart.data.datasets.length; i++) {
        for (let j = 0; j < chart.data.datasets[i].data.length; j++) {
          const unitData = chart.data.datasets[i].data[j];

          const yPosition = unitData > maximumValue / 2 ? 12 : -6;
          ctx.fillText(
            chart.data.datasets[i].data[j],
            chart?.getDatasetMeta(i)?.data[j]?.x,
            chart?.getDatasetMeta(i)?.data[j]?.y + yPosition
          );
        }
      }
    }
  },
};

ChartJS.defaults.font.family = "Manrope";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ratingLabels
);

export interface RatingBarChartCustomerInactiveProps {
  labels?: string[];
  data?: number[][];
}

export const RatingBarChartCustomerInactive = ({
  labels = [],
  data = [],
}: RatingBarChartCustomerInactiveProps) => {
  const options = {
    type: "bar",
    // responsive: true,
    maintainAspectRatio: false,
    width: 1000,
    plugins: {
      tooltip: {
        // hide tooltip
        backgroundColor: "rgba(255,255,255,0)",
        titleColor: "rgba(255,255,255,0)",
        bodyColor: "rgba(255,255,255,0)",
        boxWidth: 0,
        boxHeight: 0,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          fontSize: 10,
          fontWeight: 500,
          color: "#FFFFFF",
        },
      },
      y: {
        beginAtZero: true,
        type: "linear" as const,
        border: {
          display: false,
        },
        grid: {
          display: true,
          drawTicks: false,
          color: "#666666",
        },
        position: "left" as const,
        ticks: {
          fontSize: 10,
          fontWeight: 500,
          color: "#FFFFFF",
        },
      },
    },

    // onHover: (_: any, activeElements: any) => {
    //   if (activeElements[0]) {
    //     const ctx = activeElements[0].element.$context;
    //     setActiveIndex(ctx.dataIndex);
    //   } else {
    //     setActiveIndex(undefined);
    //   }
    // },
  };

  const chartData = {
    labels: labels,
    datasets:
      data?.map((item) => {
        return {
          label: "Dataset 1",
          data: item,
          backgroundColor: "#2E59C6",
          barPercentage: 0.8,
        };
      }) || [],
  };
  return <Bar id={"rating-chart"} options={options} data={chartData} />;
};
