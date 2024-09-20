import * as React from "react";
import clsx from "clsx";
import { OutletPictureList } from "../outlet_picture/OutletPicture.list";
import SVGIcon from "src/core/ui/icons";
import { Link } from "react-router-dom";

export interface ItemCardListProps {
  name?: string;
  registration_time?: string;
  photo?: string;
  mobile?: string;
  address?: string;
  initial?: string;
  cta?: {
    primary: {
      children: React.ReactNode;
      href?: string;
      onClick?: () => void;
    };
    secondary: {
      children: React.ReactNode;
      href?: string;
      onClick?: () => void;
    };
  };
}

export const ItemCardList = ({
  name = "",
  initial = "",
  registration_time = "",
  photo = "",
  mobile = "",
  address = "",
  cta = {
    primary: {
      children: "",
      onClick: () => {},
    },
    secondary: {
      children: "",
      onClick: () => {},
    },
  },
}: ItemCardListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-center justify-items-center gap-y-[1.5rem] w-full",
        "p-[1rem]",
        "cursor-pointer",
        "bg-dark-charcoal",
        "rounded-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] justify-center justify-items-center items-start content-start w-full"
        )}
      >
        <OutletPictureList src={photo}>{initial}</OutletPictureList>

        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] justify-center justify-items-center items-start content-start"
          )}
        >
          <p className={clsx("text-[1.5rem] text-white font-bold text-center")}>
            {name}
          </p>
          <p
            className={clsx(
              "text-[1rem] text-white-80 font-regular text-center"
            )}
          >
            {mobile}
          </p>
          <p
            className={clsx(
              "text-[1rem] text-white-80 font-regular text-center"
            )}
          >
            {address}
          </p>
          <p
            className={clsx(
              "text-[1rem] text-white-80 font-regular text-center"
            )}
            dangerouslySetInnerHTML={{ __html: registration_time }}
          />
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-2 gap-x-[1rem] place-content-start place-items-start w-full"
        )}
      >
        {!cta.secondary.href ? (
          <button
            className={clsx(
              "flex items-center justify-center w-full gap-x-[0.5rem]",
              "bg-flame rounded-[0.5rem] py-[0.75rem]",
              "text-[1rem] text-white font-bold text-center uppercase",
              "disabled:bg-granite-gray disabled:text-spanish-gray"
            )}
            onClick={cta.secondary.onClick}
          >
            <SVGIcon
              name="Trash"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
            />
            {cta.secondary.children}
          </button>
        ) : (
          <Link
            className={clsx(
              "flex items-center justify-center w-full gap-x-[0.5rem]",
              "bg-flame rounded-[0.5rem] py-[0.75rem]",
              "text-[1rem] text-white font-bold text-center uppercase",
              "disabled:bg-granite-gray disabled:text-spanish-gray"
            )}
            to={cta.secondary.href}
            onClick={cta.secondary.onClick}
          >
            <SVGIcon
              name="Trash"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
            />
            {cta.secondary.children}
          </Link>
        )}

        {!cta.primary.href ? (
          <button
            className={clsx(
              "flex items-center justify-center w-full gap-x-[0.5rem]",
              "bg-dartmouth-green rounded-[0.5rem] py-[0.75rem]",
              "text-[1rem] text-white font-bold text-center uppercase"
            )}
            onClick={cta.primary.onClick}
          >
            <SVGIcon
              name="Pencil"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
            />
            {cta.primary.children}
          </button>
        ) : (
          <Link
            className={clsx(
              "flex items-center justify-center w-full gap-x-[0.5rem]",
              "bg-dartmouth-green rounded-[0.5rem] py-[0.75rem]",
              "text-[1rem] text-white font-bold text-center uppercase"
            )}
            to={cta.primary.href}
            onClick={cta.primary.onClick}
          >
            <SVGIcon
              name="Pencil"
              className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
            />
            {cta.primary.children}
          </Link>
        )}
      </div>
    </div>
  );
};
