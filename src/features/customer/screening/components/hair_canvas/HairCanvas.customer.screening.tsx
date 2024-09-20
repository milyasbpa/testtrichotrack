import { useRef, useEffect } from "react";
import clsx from "clsx";

export interface HairCanvasCustomerScreeningProps
  extends React.HTMLProps<HTMLCanvasElement> {
  width?: number;
  height?: number;
  annotations?: {
    boundary: number[][];
  }[];
}

const normalHairStrokeStyle = (value: number) => {
  let result: string = "#FFFFFF";
  switch (value % 36) {
    case 0: {
      result = "rgba(61, 249, 235, 0.5)";
      break;
    }
    case 1: {
      result = "rgba(85, 136, 224, 0.5)";
      break;
    }
    case 2: {
      result = "rgba(42, 196, 112, 0.5)";
      break;
    }
    case 3: {
      result = "rgba(213, 192, 255, 0.5)";
      break;
    }
    case 4: {
      result = "rgba(153, 153, 204, 0.5)";
      break;
    }
    case 5: {
      result = "rgba(218, 221, 173, 0.5)";
      break;
    }
    case 6: {
      result = "rgba(37, 91, 242, 0.5)";
      break;
    }
    case 7: {
      result = "rgba(246, 173, 73, 0.5)";
      break;
    }
    case 8: {
      result = "rgba(66, 80, 122, 0.5)";
      break;
    }
    case 9: {
      result = "rgba(230, 235, 99, 0.5)";
      break;
    }
    case 10: {
      result = "rgba(151, 226, 231, 0.5)";
      break;
    }
    case 11: {
      result = "rgba(141, 84, 244, 0.5)";
      break;
    }
    case 12: {
      result = "rgba(187, 240, 138, 0.5)";
      break;
    }
    case 13: {
      result = "rgba(79, 168, 116, 0.5)";
      break;
    }
    case 14: {
      result = "rgba(227, 148, 67, 0.5)";
      break;
    }
    case 15: {
      result = "rgba(73, 69, 195, 0.5)";
      break;
    }
    case 16: {
      result = "rgba(34, 188, 185, 0.5)";
      break;
    }
    case 17: {
      result = "rgba(141, 198, 63, 0.5)";
      break;
    }
    case 18: {
      result = "rgba(254, 210, 0, 0.5)";
      break;
    }
    case 19: {
      result = "rgba(78, 42, 132, 0.5)";
      break;
    }
    case 20: {
      result = "rgba(255, 23, 228, 0.5)";
      break;
    }
    case 21: {
      result = "rgba(66, 183, 155, 0.5)";
      break;
    }
    case 22: {
      result = "rgba(214, 136, 209, 0.5)";
      break;
    }
    case 23: {
      result = "rgba(0, 81, 203, 0.5)";
      break;
    }
    case 24: {
      result = "rgba(158, 24, 87, 0.5)";
      break;
    }
    case 25: {
      result = "rgba(122, 169, 0, 0.5)";
      break;
    }
    case 26: {
      result = "rgba(242, 228, 183, 0.5)";
      break;
    }
    case 27: {
      result = "rgba(157, 145, 113, 0.5)";
      break;
    }
    case 28: {
      result = "rgba(83, 55, 69, 0.5)";
      break;
    }
    case 29: {
      result = "rgba(171, 78, 104, 0.5)";
      break;
    }
    case 30: {
      result = "rgba(255, 200, 221, 0.5)";
      break;
    }
    case 31: {
      result = "rgba(125, 133, 19, 0.5)";
      break;
    }
    case 32: {
      result = "rgba(239, 197, 166, 0.5)";
      break;
    }
    case 33: {
      result = "rgba(0, 191, 255, 0.5)";
      break;
    }
    case 34: {
      result = "rgba(0, 206, 209, 0.5)";
      break;
    }
    case 35: {
      result = "rgba(0, 250, 154, 0.5)";
      break;
    }

    default:
      break;
  }
  return result;
};

export const HairCanvasCustomerScreening = ({
  annotations = [],
  width = 0,
  height = 0,
}: HairCanvasCustomerScreeningProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCanvas = (context: CanvasRenderingContext2D) => {
    if (annotations.length > 0) {
      for (let i = 0; i < annotations.length; i++) {
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
        context.fillStyle = normalHairStrokeStyle(i);
        context.fill();
        context.closePath();
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

    drawCanvas(context);
  }, [width, height, annotations]);
  return (
    <canvas
      className={clsx("absolute", "z-10")}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};
