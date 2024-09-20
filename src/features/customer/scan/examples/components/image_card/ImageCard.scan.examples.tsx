import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";

export interface ImageCardScanExamplesProps {
  type?: string;
  image?: string;
  description?: string;
}

export const ImageCardScanExamples = ({
  type = "", // good | bad
  image = "",
  description = "",
}: ImageCardScanExamplesProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-y-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center",
          "rounded-[0.5rem]",
          "w-full h-full",
          "box-border",
          "relative",
          "border border-granite-gray"
        )}
      >
        {/* header */}

        {/* photo */}
        <div
          className={clsx(
            "w-full h-full",
            "relative",
            "box-border",
            "grid grid-cols-1 justify-center justify-items-center"
          )}
        >
          <img
            src={image}
            className={clsx("w-[80%]", "aspect-[3/4]", "rounded-[0.5rem]")}
          />
        </div>
      </div>

      <SVGIcon
        name={type === "good" ? "CheckEmptyCircle" : "ExclamationEmptyCircle"}
        className={clsx(
          "w-[42px] h-[42px]",
          type === "good" ? "fill-[#017747]" : "fill-[#9a2c14]"
        )}
      />

      <p
        className={clsx(
          "text-[1rem] text-granite-gray font-regular text-center"
        )}
      >
        {description}
      </p>
    </div>
  );
};
