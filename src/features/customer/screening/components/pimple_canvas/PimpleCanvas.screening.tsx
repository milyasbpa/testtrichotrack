import { useRef, useEffect } from "react";
import clsx from "clsx";

export interface IPimpleCanvasScreeningProps
  extends React.HTMLProps<HTMLCanvasElement> {
  annotations?: {
    label: string;
    boundary: number[][];
  }[];
  width?: number;
  height?: number;
}

export const PimpleCanvasScreening = ({
  annotations = [],
  width = 0,
  height = 0,
}: IPimpleCanvasScreeningProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCanvas = (
    context: CanvasRenderingContext2D,
    _: HTMLCanvasElement
  ) => {
    if (annotations.length > 0) {
      for (let i = 0; i < annotations.length; i++) {
        const moveToCoordinate = annotations[i].boundary.filter(
          (_, index) => index === 0
        );

        const lineToCoordinate = annotations[i].boundary.filter(
          (_, index) => index !== 0
        );

        context.beginPath();

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
        context.strokeStyle = "rgba(234, 75, 75, 0.8)";

        // legend
        // box
        context.fillStyle = "rgba(234, 75, 75, 0.8)";
        const LegendBoxWidth = 56;
        const LegendBoxHeight = 24;
        context.fillRect(
          (1 - lineToCoordinate[2][1]) * width - 1,
          lineToCoordinate[2][0] * height - LegendBoxHeight,
          LegendBoxWidth,
          LegendBoxHeight
        );
        // text
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
      className={clsx("absolute", "z-30")}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};
