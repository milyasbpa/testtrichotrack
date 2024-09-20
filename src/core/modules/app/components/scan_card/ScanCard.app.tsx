import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { ImageCanvas } from "src/core/ui/components/image_canvas";

export interface ScanCardAppProps {
  header?: {
    region: string;
    image_url: string;
  };
  id?: number;
  rotation?: number;
  image_url?: string;

  onClick?: () => void;
}

export const ScanCardApp = ({
  id = 0,
  header = {
    region: "",
    image_url: "",
  },
  rotation = 90,
  image_url = "",
  onClick = () => {},
}: ScanCardAppProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    setWidth(parentRef.current.clientWidth);
  }, [parentRef.current?.clientHeight, parentRef.current?.clientWidth]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        "rounded-[1rem]",
        "height-[340px]",
        "w-full",
        "box-border"
      )}
      ref={ref}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-flow-col content-center items-center justify-start justify-items-start gap-[0.5rem]",
          "px-[0.5rem] py-[1rem]",
          "w-full h-[2.5rem]",
          "rounded-tl-[0.5rem] rounded-tr-[0.5rem]",
          "box-border",
          "bg-charleston-green"
        )}
      >
        <img src={header.image_url} className={clsx("w-[1.5rem] h-[1.5rem]")} />

        <h3 className={clsx("text-[0.625rem] text-white-87 font-bold")}>
          {header.region}
        </h3>
      </div>

      {/* photo */}

      <div
        ref={parentRef}
        className={clsx(
          "w-full",
          "overflow-hidden",
          "relative",
          "box-border",
          "grid place-content-center place-items-center"
        )}
        id={String(id)}
        onClick={onClick}
        style={{
          height: (width / 3) * 4,
        }}
      >
        <ImageCanvas
          image_url={image_url}
          width={width}
          height={(width / 3) * 4}
          rotation={rotation}
        />
      </div>
    </div>
  );
};
