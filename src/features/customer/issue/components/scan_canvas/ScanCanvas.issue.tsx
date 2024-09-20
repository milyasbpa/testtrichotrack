import { useEffect, useRef } from "react";
import clsx from "clsx";

const degToRad = (deg: number) => {
  return (1 / 57.3) * deg;
};

export interface IScanCanvasIssueProps {
  image?: string;
  deg?: number;
  width?: number;
  height?: number;
}

ScanCanvasIssue.defaultProps = {
  image: "",
  deg: 90,
  width: 0,
  height: 0,
};

export default function ScanCanvasIssue(props: IScanCanvasIssueProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const canvasWidth = props.width !== undefined ? props.width : 0;
    const canvasHeight = props.height !== undefined ? props.height : 0;
    let deg = props.deg !== undefined ? props.deg : 0;
    let image: any;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const draw = () => {
      let scale, imageHeight, imageWidth, scaleX, scaleY;
      if (deg !== 0 && deg !== 180) {
        imageHeight = image.width;
        imageWidth = image.height;
      } else {
        imageHeight = image.height;
        imageWidth = image.width;
      }
      scaleX = canvasWidth / imageWidth;
      scaleY = canvasHeight / imageHeight;

      if (
        imageWidth * scaleX <= canvasWidth &&
        imageHeight * scaleX <= canvasHeight
      ) {
        scale = scaleX;
      } else {
        scale = scaleY;
      }

      context.save();
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      context.translate(canvasWidth / 2, canvasHeight / 2);
      context.rotate(degToRad(deg));
      context.scale(scale, scale);
      context.drawImage(
        image,
        -image.width / 2,
        -image.height / 2,
        image.width,
        image.height
      );

      context.restore();
    };
    image = new Image();
    image.onload = draw;
    image.src = props.image;

    draw();
  }, [props.image, props.width, props.height, props.deg]);
  return <canvas className={clsx("absolute")} ref={canvasRef}></canvas>;
}
