import * as React from "react";
import clsx from "clsx";
import { MoonLoader } from "src/core/ui/components/moon_loader";

export interface RearCameraProps {
  active_region?: number;
  onClick?: (data: { image: string }) => void;
}

// NOTE: global portrait mode
export const RearCamera = ({ active_region = 0, onClick }: RearCameraProps) => {
  const [orientation, setOrientation] = React.useState<
    "portrait" | "landscape" | null
  >(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      let constraints = {
        video: {
          width: { ideal: 480 },
          height: { ideal: 640 },

          deviceId: {
            exact: "",
          },
        },
      };
      if (
        window.screen.orientation.type === "landscape-primary" &&
        (window.screen.orientation.angle === 0 ||
          window.screen.orientation.angle === 180)
      ) {
        constraints = {
          ...constraints,
          video: {
            ...constraints.video,
            width: { ...constraints.video.width, ideal: 480 },
            height: { ...constraints.video.width, ideal: 640 },
          },
        };
      }
      if (
        window.screen.orientation.type === "portrait-primary" &&
        (window.screen.orientation.angle === 90 ||
          window.screen.orientation.angle === 270)
      ) {
        constraints = {
          ...constraints,
          video: {
            ...constraints.video,
            width: { ...constraints.video.width, ideal: 1280 },
            height: { ...constraints.video.width, ideal: 960 },
          },
        };
      }
      if (
        window.screen.orientation.type === "portrait-primary" &&
        (window.screen.orientation.angle === 0 ||
          window.screen.orientation.angle === 180)
      ) {
        constraints = {
          ...constraints,
          video: {
            ...constraints.video,
            width: { ...constraints.video.width, ideal: 480 },
            height: { ...constraints.video.width, ideal: 640 },
          },
        };
      }
      if (
        window.screen.orientation.type === "landscape-primary" &&
        (window.screen.orientation.angle === 90 ||
          window.screen.orientation.angle === 270)
      ) {
        constraints = {
          ...constraints,
          video: {
            ...constraints.video,
            width: { ...constraints.video.width, ideal: 640 },
            height: { ...constraints.video.width, ideal: 480 },
          },
        };
      }

      await navigator.mediaDevices.enumerateDevices().then((devices) => {
        // NOTES: don't forget to uncomment
        // if (
        //   window.screen.orientation.type === "landscape-primary" &&
        //   (window.screen.orientation.angle === 0 ||
        //     window.screen.orientation.angle === 180)
        // ) {
        //   devices.forEach((device) => {
        //     if (!constraints.video.deviceId.exact.length) {
        //       if (device.label.toLowerCase().includes("logitech streamcam")) {
        //         constraints = {
        //           ...constraints,
        //           video: {
        //             ...constraints.video,
        //             deviceId: {
        //               ...constraints.video.deviceId,
        //               exact: device.deviceId,
        //             },
        //           },
        //         };
        //       }
        //     }
        //   });
        // }
        if (
          window.screen.orientation.type === "landscape-primary" &&
          (window.screen.orientation.angle === 0 ||
            window.screen.orientation.angle === 180)
        ) {
          devices.forEach((device) => {
            if (!constraints.video.deviceId.exact.length) {
              if (device.label.toLowerCase().includes("facetime")) {
                constraints = {
                  ...constraints,
                  video: {
                    ...constraints.video,
                    deviceId: {
                      ...constraints.video.deviceId,
                      exact: device.deviceId,
                    },
                  },
                };
              }
            }
          });
        }

        if (
          window.screen.orientation.type === "portrait-primary" &&
          (window.screen.orientation.angle === 90 ||
            window.screen.orientation.angle === 270)
        ) {
          devices.forEach((device) => {
            if (!constraints.video.deviceId.exact.length) {
              if (device.label.toLowerCase().includes("surface camera rear")) {
                constraints = {
                  ...constraints,
                  video: {
                    ...constraints.video,
                    deviceId: {
                      ...constraints.video.deviceId,
                      exact: device.deviceId,
                    },
                  },
                };
              }
            }
          });
        }
      });

      const videoStream = await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((res) => {
          return res;
        })
        .catch(() => {
          return null;
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
  }, []);

  const resizeAndRotateImageByMultipleOf90Degrees = (
    imageBase64: string,
    degrees: 90 | 180 | 270 | 0,
    width: number,
    height: number,
    cb: (image: string) => void
  ) => {
    let image = new Image();
    image.src = imageBase64;

    image.onload = () => {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (degrees === 90) {
        canvas.width = height;
        canvas.height = width;
      } else if (degrees === 180) {
        canvas.width = width;
        canvas.height = height;
      } else if (degrees === 270) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
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

        ctx?.drawImage(image, 0, 0, width, height);

        cb(canvas.toDataURL("image/jpeg"));
      }
    };
  };

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

        resizeAndRotateImageByMultipleOf90Degrees(
          image,
          orientation === "landscape" ? 0 : 0,
          960,
          1280,
          (dataImage: string) => {
            if (onClick) {
              console.log(dataImage, "ini dataimage");
              onClick({ image: dataImage });
            }
          }
        );
      }
    }
  };

  return (
    <button
      className={clsx(
        "border border-[#666666]",
        "grid grid-cols-1 place-content-center place-items-center",
        "relative",
        "grid-rows-1",
        "w-full",
        "h-full",
        "rounded-[1rem]",
        "overflow-hidden"
      )}
      onClick={handleClickCamera}
    >
      <div className={clsx("relative", "h-full")}>
        <video
          id={`rear-camera-video`}
          autoPlay
          ref={videoRef}
          className={clsx("rounded-[0px]", "rotate-0", "h-full")}
        ></video>
        <canvas
          id={`rear-camera-canvas`}
          ref={canvasRef}
          className={clsx("hidden")}
        ></canvas>
      </div>

      {isLoading && (
        <div
          className={clsx(
            "absolute",
            "bg-black",
            "h-full aspect-[3/4]",
            "grid grid-cols-1 place-content-center place-items-center"
          )}
        >
          <MoonLoader size={100} color={"#017948"} />
        </div>
      )}
      {!isLoading && (
        <div
          className={clsx(
            "absolute",
            "top-0 bottom-0 left-[50%]",
            "translate-x-[-50%]",
            "h-full aspect-[3/4]"
          )}
        >
          <img
            src={
              active_region === 0
                ? "/illustrations/frontal_overhead_overlay.illustration.svg"
                : "/illustrations/rear_overhead_overlay.illustration.svg"
            }
            className={clsx("h-full w-full", "rotate-0", "z-[99]")}
          />
        </div>
      )}
    </button>
  );
};
