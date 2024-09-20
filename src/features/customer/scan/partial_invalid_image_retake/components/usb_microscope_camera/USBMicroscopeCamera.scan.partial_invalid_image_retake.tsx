import * as React from "react";
import clsx from "clsx";
import style from "./usb_microscope_camera.module.scss";
import { MoonLoader } from "src/core/ui/components/moon_loader";
const canvasID = `usb-microscope-camera-scan-canvas__partial-invalid-scan-image-retake`;
const videoID = `usb-microscope-camera-scan-video__partial-invalid-scan-image-retake`;

export interface USBMicroscopeCameraPartialInvalidScanImageRetakeProps {
  onClick?: (data: { image: string }) => void;
}

export const USBMicroscopeCameraPartialInvalidScanImageRetake = ({
  onClick,
}: USBMicroscopeCameraPartialInvalidScanImageRetakeProps) => {
  const [orientation, setOrientation] = React.useState<
    "portrait" | "landscape" | null
  >(null);

  const width = 952;
  const height = (width * 3) / 4;
  const widthStyle = `w-[${width}px]`;
  const heightStyle = `h-[${height}]px`;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      };
      const videoStream = await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((res) => {
          return res;
        });
      if (videoRef.current !== null) {
        videoRef.current.srcObject = videoStream;
      }
      setIsLoading(() => false);
    } catch (error) {
      setIsLoading(() => false);
    }
  };
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading((_) => true);
      startCamera();
    }
    window.screen.orientation.addEventListener("change", function (e: any) {
      if (e.currentTarget.type === "landscape-primary") {
        setOrientation("landscape");
      }
      if (e.currentTarget.type === "portrait-primary") {
        setOrientation("portrait");
      }
    });
  }, []);

  const handleClickCamera = () => {
    if (canvasRef.current !== null && videoRef.current !== null) {
      let context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      if (context !== null) {
        context?.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const image = canvasRef.current.toDataURL("image/jpeg");

        if (onClick) {
          onClick({ image: image });
        }
      }
    }
  };

  return (
    <div
      className={`${style["scalp-scan-camera__container"]} ${
        orientation === "landscape"
          ? style["scalp-scan-camera__container--landscape"]
          : style["scalp-scan-camera__container--portrait"]
      }`}
    >
      <div
        className={clsx(
          "w-[952px] aspect-4/3 grid grid-cols-1 place-content-center place-items-center",
          "rounded-[1rem]"
        )}
      >
        <button onClick={handleClickCamera}>
          <video
            id={videoID}
            autoPlay
            ref={videoRef}
            className={clsx(
              `${style["scalp-scan-camera__webcam"]}`,
              widthStyle,
              heightStyle
            )}
          ></video>
          <canvas
            id={canvasID}
            ref={canvasRef}
            className={clsx("hidden")}
          ></canvas>
        </button>
      </div>

      {isLoading && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center w-[712px] aspect-3/4",
            "absolute bg-black",
            "rounded-[1rem]"
          )}
        >
          <MoonLoader size={100} color={"#017948"} />
        </div>
      )}
    </div>
  );
};
