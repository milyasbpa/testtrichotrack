import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface PreviewCardCompulsoryScanPreviewProps {
  image?: string;
  region?: string;
  icon?: string;
  value?: number;
  actions?: {
    primary: string;
  };
  onRetake?: (value: number) => void;
}

export const PreviewCardCompulsoryScanPreview = ({
  image = "",
  region = "",
  icon = "",
  value = -1,
  actions = {
    primary: "",
  },
  onRetake,
}: PreviewCardCompulsoryScanPreviewProps) => {
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

  const handleRetake = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onRetake) {
      onRetake(parseInt(e.currentTarget.value));
    }
  };

  return (
    <div
      className={clsx(
        "w-full",
        "rounded-[0.5rem]",
        "flex items-center justify-center",
        "border border-granite-gray",
        "relative"
      )}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] content-center items-center justify-start justify-items-start gap-x-[1rem]",
          "p-[1rem]",
          "w-full h-[4rem]",
          "rounded-tl-[0.5rem] rounded-tr-[0.5rem]",
          "box-border",
          "bg-charleston-green",
          "absolute top-0 z-10"
        )}
      >
        <img src={icon} />

        <h3 className={clsx("text-[1.125rem] text-white-87 font-bold")}>
          {region}
        </h3>
      </div>

      <img
        src={activePhoto}
        className={clsx("w-full", "aspect-[3/4]", "rounded-[0.5rem]")}
      />

      {/* footer */}
      <button
        className={clsx(
          "flex items-center justify-center gap-x-[0.5rem]",
          "p-[1rem]",
          "w-full",
          "rounded-bl-[0.5rem] rounded-br-[0.5rem]",
          "box-border",
          "bg-eerie-black-50",
          "absolute bottom-0"
        )}
        value={value}
        onClick={handleRetake}
      >
        <p className={clsx("text-[1.25rem] text-go-green font-bold uppercase")}>
          {actions.primary}
        </p>
      </button>
    </div>
  );
};
