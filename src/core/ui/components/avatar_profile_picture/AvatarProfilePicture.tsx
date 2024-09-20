import * as React from "react";
import clsx from "clsx";
import { Avatar } from "../avatar";

export interface AvatarProfilePictureProps {
  label?: string;
  image?: {
    picture_url: string;
    banner_url: string;
  };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AvatarProfilePicture = ({
  label = "",
  image = {
    picture_url: "",

    banner_url: "",
  },
  onClick = () => {},
}: AvatarProfilePictureProps) => {
  return (
    <button
      className={clsx("grid", "p-[0rem]", "box-border", "relative")}
      onClick={onClick}
    >
      <Avatar src={image.picture_url} size={"lg"} />

      <img
        className={clsx(
          "grid place-content-center place-items-center",
          "absolute bottom-[0rem] left-[50%] z-10 translate-x-[-50%]"
        )}
        src={image.banner_url}
      />
      <div
        className={clsx(
          "grid place-content-center place-items-center",
          "absolute left-[50%] bottom-[0rem] z-30 translate-x-[-50%] translate-y-[-0.5rem]"
        )}
      >
        <p className={clsx("text-center text-[0.875rem] text-white font-bold")}>
          {label}
        </p>
      </div>
    </button>
  );
};
