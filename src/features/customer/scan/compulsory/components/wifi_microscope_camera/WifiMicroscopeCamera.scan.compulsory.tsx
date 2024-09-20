import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export interface WifiMicroscopeCameraCompulsoryScanProps {
  image?: string;
  onCapture?: () => void;
}

export const WifiMicroscopeCameraCompulsoryScan = ({
  image = "",
  onCapture,
}: WifiMicroscopeCameraCompulsoryScanProps) => {
  const [parentHeight, setParentHeight] = useState(0);
  const parentRef = useRef<HTMLDivElement | null>(null);

  // NOTE: we must know width of the image in iframe
  // NOTE: initial position is horizontal
  // NOTE: wifi microscope size is 1280 *1024
  const iframeWidth = 1280;
  const iframeHeight = (iframeWidth / 4) * 3;
  // NOTE: we must know width of the image in iframe
  const scale = parentHeight / iframeWidth;

  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setParentHeight(parentRef.current.clientHeight);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

  return (
    <div
      ref={parentRef}
      className={clsx(
        "grid place-content-center place-items-center grid-cols-1",
        "rounded-[1rem]",
        "h-full",
        "overflow-hidden",
        "border border-granite-gray"
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
        <button
          className={clsx(
            "bg-[red]",
            "opacity-0",
            "absolute",
            "z-[9999]",
            "cursor-pointer"
          )}
          style={{
            width: parentHeight,
            height: (parentHeight / 4) * 3,
          }}
          onClick={onCapture}
        />

        <button onClick={onCapture}>
          <iframe
            src={image}
            style={{
              transform: `scale(${scale})`,
            }}
            width={iframeWidth}
            height={iframeHeight}
            scrolling="no"
          ></iframe>
        </button>
      </div>
    </div>
  );
};
