import clsx from "clsx";

export interface FaceAreaSpotlightScanSelectionAreaProps {
  items?: {
    id: string;
    style: {
      opacity: number;
      top: number;
      left: number;
    };
    image_url: string;
  }[];
  onClick?: (value: string) => void;
}

export const FaceAreaSpotlightScanSelectionArea = ({
  items = [],
  onClick = () => {},
}: FaceAreaSpotlightScanSelectionAreaProps) => {
  return (
    <div className={clsx("relative")}>
      <img src={"/illustrations/region-selector.illustration.svg"} />
      {items.map((item, index) => (
        <img
          id={item.id.toString()}
          key={index}
          className={clsx("absolute", "z-10")}
          src={item.image_url}
          style={{
            opacity: item.style.opacity,
            top: item.style.top,
            left: item.style.left,
          }}
          onClick={() => onClick(item.id)}
        />
      ))}
    </div>
  );
};
