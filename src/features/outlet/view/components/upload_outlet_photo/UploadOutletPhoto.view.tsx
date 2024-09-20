import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";

export interface UploadOutletPhotoViewProps {
  photo?: string;
  label?: string;
}

export const UploadOutletPhotoView = ({
  photo = "",
  label = "",
}: UploadOutletPhotoViewProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [croppedPhotoProfile, setCroppedPhotoProfile] = useState("");

  useEffect(() => {
    if (photo.length > 0) {
      setCroppedPhotoProfile(photo);
    }
  }, [photo]);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center w-full gap-x-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid items-start content-start justify-center justify-items-center w-[200px]"
        )}
      >
        <p className={clsx("text-[1rem] text-white-80 font-bold text-center")}>
          {label}
        </p>

        <div
          className={clsx(
            "flex items-center justify-center w-[200px] h-[200px] bg-raisin-black"
          )}
        >
          {croppedPhotoProfile.length > 0 ? (
            <img className={clsx("w-full h-full")} src={croppedPhotoProfile} />
          ) : (
            <SVGIcon name="Image" className={clsx("w-[100px] h-[100px]")} />
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        id="`inputFile`"
        className={clsx("sr-only")}
        multiple={false}
        disabled={true}
        accept={"image/jpeg image/png"}
      />
    </div>
  );
};
