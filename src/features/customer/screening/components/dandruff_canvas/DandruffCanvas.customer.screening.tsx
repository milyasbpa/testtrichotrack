import { useRef, useEffect } from "react";
import clsx from "clsx";

export interface DandruffCanvasScreeningProps
  extends React.HTMLProps<HTMLCanvasElement> {
  annotations?: {
    label: string;
    boundary: number[][];
  }[];
  width?: number;
  height?: number;
}

export const DandruffCanvasScreening = ({
  annotations = [],
  width = 0,
  height = 0,
}: DandruffCanvasScreeningProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCanvas = (
    context: CanvasRenderingContext2D,
    _: HTMLCanvasElement
  ) => {
    if (annotations.length > 0) {
      for (let i = 0; i < annotations.length; i++) {
        // const LABEL =
        //   annotations[i].type === "oily"
        //     ? "Oily Dandruff"
        //     : annotations[i].type === "dry"
        //     ? "Dry Dandruff"
        //     : "";
        // const LABEL = "";
        context.beginPath();

        const moveToCoordinate = annotations[i].boundary.filter(
          (_, index) => index === 0
        );

        const lineToCoordinate = annotations[i].boundary.filter(
          (_, index) => index !== 0
        );

        if (!moveToCoordinate.length && !lineToCoordinate.length) {
          return;
        }
        const firstCoordinate = [
          (1 - moveToCoordinate[0][1]) * width,
          moveToCoordinate[0][0] * height,
        ];
        context.moveTo(firstCoordinate[0], firstCoordinate[1]);

        for (let j = 0; j < lineToCoordinate.length; j++) {
          const nextCoordinate = [
            (1 - lineToCoordinate[j][1]) * width,
            lineToCoordinate[j][0] * height,
          ];
          context.lineTo(nextCoordinate[0], nextCoordinate[1]);
        }
        context.lineWidth = 2;
        // context.strokeStyle =
        //   annotations[i].type === "oily"
        //     ? "rgba(253, 182, 0, 0.8)"
        //     : annotations[i].type === "dry"
        //     ? "rgba(255, 255, 255, 0.8)"
        //     : "#FFFFFF";
        context.strokeStyle = "rgba(255, 255, 255, 0.8)";

        // legend
        // box
        // context.fillStyle =
        //   annotations[i].type === "oily"
        //     ? "rgba(253, 182, 0, 0.8)"
        //     : annotations[i].type === "dry"
        //     ? "rgba(255, 255, 255, 0.8)"
        //     : "#FFFFFF";
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        const LegendBoxWidth = 68;
        const LegendBoxHeight = 24;
        context.fillRect(
          (1 - lineToCoordinate[2][1]) * width - 1,
          lineToCoordinate[2][0] * height - LegendBoxHeight,
          LegendBoxWidth,
          LegendBoxHeight
        );

        //  text
        context.font = "medium 16px Manrope, sans-serif";
        context.fillStyle = "#262626";
        context.fillText(
          annotations[i].label,
          (1 - lineToCoordinate[2][1]) * width + 4,
          lineToCoordinate[2][0] * height - 8
        );

        context.closePath();
        context.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    if (!annotations) {
      return;
    }

    if (!width || !height) {
      return;
    }

    drawCanvas(context, canvas);
  }, [width, height, annotations]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx("absolute", "z-40")}
      width={width}
      height={height}
    />
  );
};
