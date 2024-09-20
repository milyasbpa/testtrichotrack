import { useState, useEffect } from "react";
import clsx from "clsx";

export interface ImagePreviewCompulsoryScan {
  image?: string;
}

export const ImagePreviewCompulsoryScan = ({
  image = "",
}: ImagePreviewCompulsoryScan) => {
  const [activePhoto, setActivePhoto] = useState<string>("");

  const rotateImageByMultipleOf90Degrees = (
    imageBase64: string,
    degrees: 90 | 180 | 270 | 0,
    cb: (image: string) => void
  ) => {
    let image = new Image();
    image.src = imageBase64;

    image.onload = () => {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (degrees === 90) {
        canvas.width = image.height;
        canvas.height = image.width;
      } else if (degrees === 180) {
        canvas.width = image.width;
        canvas.height = image.height;
      } else if (degrees === 270) {
        canvas.width = image.height;
        canvas.height = image.width;
      } else {
        canvas.width = image.width;
        canvas.height = image.height;
      }

      if (ctx !== null) {
        ctx.rotate((degrees * Math.PI) / 180);

        if (degrees === 90) {
          ctx.translate(0, -canvas.width);
        } else if (degrees === 180) {
          ctx.translate(-canvas.width, -canvas.height);
        } else if (degrees === 270) {
          ctx.translate(-canvas.height, 0);
        } else {
          ctx.translate(0, 0);
        }

        ctx?.drawImage(image, 0, 0);

        cb(canvas.toDataURL("image/jpeg"));
      }
    };
  };

  useEffect(() => {
    if (image !== undefined) {
      rotateImageByMultipleOf90Degrees(image, 90, (image: string) => {
        setActivePhoto(image);
      });
    }
  }, [image]);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-1 justify-center justify-items-center",
        "h-full",
        "w-full",
        "rounded-[1rem]",
        "border border-granite-gray"
      )}
    >
      <img src={activePhoto} className={clsx("h-full", "aspect-3/4")} />
    </div>
  );
};
