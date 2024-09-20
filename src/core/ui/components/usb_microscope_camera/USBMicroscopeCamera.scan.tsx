import * as React from "react";
import clsx from "clsx";
import { MoonLoader } from "../moon_loader";
export interface USBMicroscopeCameraProps {
  onClick?: (data: { image: string }) => void;
}

export const USBMicroscopeCamera = ({ onClick }: USBMicroscopeCameraProps) => {
  // const [orientation, setOrientation] = React.useState<
  //   "portrait" | "landscape" | null
  // >(null);

  // const width = 952;
  // const height = (width * 3) / 4;
  // const widthStyle = `w-[${width}px]`;
  // const heightStyle = `h-[${height}]px`;

  const [parentHeight, setParentHeight] = React.useState(0);
  const parentRef = React.useRef<HTMLDivElement | null>(null);

  // NOTE: we must know width of the image in iframe
  // NOTE: initial position is horizontal
  // const iframeWidth = 640;
  const iframeWidth = 640;
  const iframeHeight = (iframeWidth / 4) * 3;
  // NOTE: we must know width of the image in iframe
  const scale = parentHeight / iframeWidth;
  const translate = {
    x: "0px",
    y: "0px",
  };

  React.useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setParentHeight(parentRef.current.clientHeight);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

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
      setIsLoading(() => true);
      startCamera();
    }
    // window.screen.orientation.addEventListener("change", function (e: any) {
    //   if (e.currentTarget.type === "landscape-primary") {
    //     setOrientation("landscape");
    //   }
    //   if (e.currentTarget.type === "portrait-primary") {
    //     setOrientation("portrait");
    //   }
    // });
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
      // className={`${style["scalp-scan-camera__container"]} ${
      //   orientation === "landscape"
      //     ? style["scalp-scan-camera__container--landscape"]
      //     : style["scalp-scan-camera__container--portrait"]
      // }`}
      ref={parentRef}
      className={clsx(
        "grid grid-cols-1 grid-rows-1 place-content-center place-items-center",
        "w-full h-full",
        "border border-[#666666]",
        "rounded-[1rem]",
        "relative"
      )}
    >
      <div
        className={clsx(
          "grid place-content-center place-items-center grid-cols-1 w-[949.3px]",
          "rounded-[1rem]",
          "relative",
          "rotate-90"
        )}
      >
        <button onClick={handleClickCamera}>
          <video
            id={`usb-microscope-camera-scan-video`}
            autoPlay
            ref={videoRef}
            style={{
              transform: `scale(${scale}) translate(${translate.x},${translate.y})`,
            }}
            width={iframeWidth}
            height={iframeHeight}
          ></video>
          <canvas
            id={`usb-microscope-camera-scan-canvas`}
            ref={canvasRef}
            className={clsx("hidden")}
          ></canvas>
        </button>
      </div>

      {isLoading && (
        <div
          className={clsx(
            "absolute",
            "bg-black",
            "h-full aspect-[3/4]",
            "grid grid-cols-1 place-content-center place-items-center",
            " bg-black"
          )}
        >
          <MoonLoader size={100} color={"#017948"} />
        </div>
      )}
    </div>
  );
};
