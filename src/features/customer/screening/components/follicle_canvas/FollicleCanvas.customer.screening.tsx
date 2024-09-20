import { useEffect, useRef } from "react";
import clsx from "clsx";

export interface FollicleCanvasScreeningProps
  extends React.HTMLProps<HTMLCanvasElement> {
  annotations?: {
    pigmentation: string;
    miniaturization: boolean;
    capacity: number;
    center: number[];
    color: string;
  }[];
  width?: number;
  height?: number;
}

export const FollicleCanvasScreening = ({
  annotations = [],
  width = 0,
  height = 0,
}: FollicleCanvasScreeningProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawCanvas = (
    context: CanvasRenderingContext2D,
    _: HTMLCanvasElement
  ) => {
    if (annotations.length > 0) {
      for (let i = 0; i < annotations.length; i++) {
        context.beginPath();
        context.lineWidth = 2;

        const xRotation = 1 - annotations[i].center[1];
        const yRotation = annotations[i].center[0];
        const radius = 10;
        if (!annotations[i].miniaturization) {
          // context.fillStyle = convertColor(annotations[i].pigmentation);
          context.fillStyle = annotations[i].color;

          context.arc(
            xRotation * width,
            yRotation * height,
            radius,
            0,
            2 * Math.PI
          );
          context.fill();
        } else {
          // context.strokeStyle = convertColor(annotations[i].pigmentation);
          context.strokeStyle = annotations[i].color;

          context.arc(
            xRotation * width,
            yRotation * height,
            radius,
            0,
            2 * Math.PI
          );

          context.stroke();
        }
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
  }, [width, height, annotations.length]);

  return (
    <>
      {annotations.length > 0 &&
        annotations.map((annotation, annotationIndex) => {
          const topLegendTransformed = annotation.center[0];
          const leftLegendTransformed = 1 - annotation.center[1];
          const toplegend = topLegendTransformed * height - 26;

          const leftLegend = leftLegendTransformed * width - 8;

          const legendColor = annotation.color;

          return (
            <div
              key={annotationIndex}
              className={clsx(
                "w-[1rem] h-[1rem]",
                "flex items-center justify-center",
                "absolute"
              )}
              style={{
                top: `${toplegend}px`,
                left: `${leftLegend}px`,
              }}
            >
              <p
                className={clsx(
                  "text-[0.875rem] font-bold",
                  "absolute",
                  "z-20"
                )}
                style={{ color: legendColor }}
              >
                {annotation.capacity}
              </p>
            </div>
          );
        })}

      <canvas
        className={clsx("absolute", "z-20")}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </>
  );
};
