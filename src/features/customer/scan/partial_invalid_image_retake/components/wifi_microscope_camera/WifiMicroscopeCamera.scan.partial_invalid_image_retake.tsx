import clsx from "clsx";

export interface WifiMicroscopeCameraPartialInvalidScanImageRetakeProps {
  image?: string;
  onCapture?: () => void;
}

export default function WifiMicroscopeCameraPartialInvalidScanImageRetake({
  image = "",
  onCapture,
}: WifiMicroscopeCameraPartialInvalidScanImageRetakeProps) {
  return (
    <div
      className={clsx(
        "grid place-content-center place-items-center grid-cols-1 h-[949.3px] border border-granite-gray",
        "rounded-[1rem]"
      )}
    >
      <div
        className={clsx(
          "grid place-content-center place-items-center grid-cols-1 w-[949.3px]",
          "rounded-[1rem]",
          "relative",
          "rotate-90 translate-y-[-50%] top-[50%]"
        )}
      >
        <button
          className={clsx(
            "w-[949.3px]",
            "aspect-4/3",
            "relative",
            "bg-[rgba(0,0,0,0)]",
            "absolute",
            "z-9999",
            "translate-y-[50%]",
            "cursor-pointer"
          )}
          onClick={onCapture}
        />

        <button onClick={onCapture}>
          <iframe
            src={image}
            className={clsx("w-[949.3px]", "aspect-4/3")}
            style={{ transform: "scale(1.48) translate(154px,-120px)" }}
            width={949.3}
            height={(949.3 / 4) * 3}
          ></iframe>
        </button>
      </div>
    </div>
  );
}
