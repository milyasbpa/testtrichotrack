import { useState, useEffect } from "react";
import clsx from "clsx";

export interface ImagePreviewGlobalScan {
  image?: string;
}

export const ImagePreviewGlobalScan = ({
  image = "",
}: ImagePreviewGlobalScan) => {
  const [activePhoto, setActivePhoto] = useState<string>("");
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.screen.orientation.addEventListener("change", function (e: any) {
        if (e.currentTarget.type === "landscape-primary") {
          setOrientation("landscape");
        }
        if (e.currentTarget.type === "portrait-primary") {
          setOrientation("portrait");
        }
      });

      if (
        window.screen.orientation.type === "landscape-primary" &&
        (window.screen.orientation.angle === 0 ||
          window.screen.orientation.angle === 180)
      ) {
        setOrientation("landscape");
      }
      if (
        window.screen.orientation.type === "portrait-primary" &&
        (window.screen.orientation.angle === 90 ||
          window.screen.orientation.angle === 270)
      ) {
        setOrientation("portrait");
      }
      if (
        window.screen.orientation.type === "portrait-primary" &&
        (window.screen.orientation.angle === 0 ||
          window.screen.orientation.angle === 180)
      ) {
        setOrientation("landscape");
      }
      if (
        window.screen.orientation.type === "landscape-primary" &&
        (window.screen.orientation.angle === 90 ||
          window.screen.orientation.angle === 270)
      ) {
        setOrientation("portrait");
      }
    }
  }, []);

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
      rotateImageByMultipleOf90Degrees(
        image,
        orientation === "landscape" ? 0 : 0,
        (image: string) => {
          setActivePhoto(image);
        }
      );
    }
  }, [image, orientation]);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-1 justify-center justify-items-center",
        "h-full w-full",
        "border border-granite-gray",
        "rounded-[1rem]"
      )}
    >
      <img src={activePhoto} className={clsx("h-full", "aspect-[3/4]")} />
    </div>
  );
};
