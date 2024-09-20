import React, { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";

const drawNeedlePlugin: Plugin = {
  id: "drawNeedle",
  afterDatasetsDraw: (chart) => {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    if (chart.canvas.id === "gauge-chart") {
      const centerX = width / 2;
      const centerY = height;
      const needleWidth = 126; // Needle image width
      const needleHeight = 24; // Needle image height

      // Load the image
      const needleImage = new Image();
      needleImage.src = "/images/needle.image.png"; // Path to the image in the public folder

      const value = (chart.config.data.datasets[0] as any)?.value ?? 0;
      const maxValue = (chart.config.data.datasets[0] as any)?.maxValue ?? 0;
      const needleAngle = (value / maxValue) * 180; // Directly from value to 180 degrees
      needleImage.onload = () => {
        ctx.save();
        ctx.translate(centerX, centerY); // Translate to the center of the doughnut
        // ctx.rotate((needleAngle * Math.PI) / 180); // Rotate by the calculated angle
        ctx.rotate((needleAngle * Math.PI) / 180); // Rotate by the calculated angle

        // Draw the image
        ctx.drawImage(
          needleImage,
          -needleWidth, // Center image horizontally
          -needleHeight / 2, // Center image vertically
          needleWidth, // Width of the image
          needleHeight // Height of the image
        );

        ctx.restore();
      };

      needleImage.onerror = () => {
        console.error("Failed to load needle image");
      };
    }
  },
};

ChartJS.register(ArcElement, Tooltip, drawNeedlePlugin);

interface GaugeChartProps {
  value?: number; // Single value to display
  maxValue?: number; // Maximum value to scale the needle
  colors?: string[]; // Array of colors for the segments
  segments?: number; // Number of segments
  label?: string;
  onSegmentClick?: (segmentIndex: number) => void;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value = 0,
  maxValue = 1,
  colors = [],
  segments = 5,
  label = "",
  onSegmentClick = () => {},
}) => {
  const chartRef = useRef<any>(null);

  // Create data for each segment
  const dataValues = Array(segments).fill(1); // Placeholder values, each segment has equal weight

  // Data for the doughnut chart
  const data = {
    value: value,
    labels: Array.from({ length: segments }, (_, i) => `Segment ${i + 1}`),
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 0,
        cutout: "75%", // Size of the inner cutout (doughnut hole)
        rotation: -90, // Start from the bottom of the chart
        circumference: 180, // Show half-circle (180 degrees),
        value: value,
        maxValue: maxValue,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"doughnut"> = {
    rotation: -90, // Rotate the chart to start from the bottom
    circumference: 180, // Half-circle chart
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const chartElement = elements[0]; // Get the clicked element
        const segmentIndex = chartElement.index; // Get the index of the clicked segment
        onSegmentClick(segmentIndex); // Trigger the callback with the index of the clicked segment
      }
    },
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full",
        "pb-[2rem]"
      )}
    >
      <div style={{ width: "300px", height: "150px", position: "relative" }}>
        <Doughnut
          id={"gauge-chart"}
          data={data}
          options={options}
          ref={chartRef}
        />
        <div
          className={clsx(
            "text-[white] text-[0.875rem] font-bold",
            "absolute",
            "bottom-[-25%]",
            "left-[50%]",
            "translate-x-[-50%]"
          )}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
