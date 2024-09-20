import React, { useState } from "react";
import clsx from "clsx";
import SVGIcon from "src/core/ui/icons";
import { Markdown } from "src/core/ui/components/markdown";
import { Divider } from "src/core/ui/components/divider";

export interface DescriptionCardCustomerIssueProps {
  cta?: {
    primary: {
      children: React.ReactNode;
    };
    secondary: {
      children: React.ReactNode;
    };
  };
  name?: string;
  photo?: string;
  introduction?: {
    name: string;
    description: string;
  };
  prevalence?: {
    name: string;
    description: string;
  };
  symptoms?: {
    name: string;
    description: string;
  };
  causes?: {
    name: string;
    description: string;
  };
}

export const DescriptionCardCustomerIssue = ({
  cta = {
    primary: {
      children: "",
    },
    secondary: {
      children: "",
    },
  },
  name = "",
  photo = "",
  introduction = {
    name: "",
    description: "",
  },
  prevalence = {
    name: "",
    description: "",
  },
  symptoms = {
    name: "",
    description: "",
  },
  causes = {
    name: "",
    description: "",
  },
}: DescriptionCardCustomerIssueProps) => {
  const [open, setOpen] = useState(false);

  const handleClickReadMore = () => {
    setOpen(!open);
  };

  const readMode = open
    ? String(cta.secondary.children).toUpperCase()
    : String(cta.primary.children).toUpperCase();
  return (
    <div
      className={clsx(
        "px-[1rem] py-[1rem]",
        "rounded-[0.5rem]",
        "bg-charleston-green",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
            "w-full"
          )}
        >
          <h3 className={clsx("text-[1.25rem] text-white font-bold")}>
            {name}
          </h3>

          <div
            className={clsx(
              "flex items-start justify-start gap-x-[1.5rem]",
              "w-full"
            )}
          >
            <img
              src={photo}
              className={clsx("w-[333px]", "aspect-[3/2]", "rounded-[0.5rem]")}
            />
            <p className={clsx("text-[1rem] text-white-80 font-regular")}>
              {introduction.description}
            </p>
          </div>
        </div>

        {/* read more content */}
        <div
          className={clsx(
            open ? "grid" : "hidden",
            "grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
            "w-full"
          )}
        >
          {/* prevalence */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
              "w-full"
            )}
          >
            <h3 className={clsx("text-[1.25rem] text-white font-bold")}>
              {prevalence.name}
            </h3>
            <Markdown markdown={prevalence.description} />
          </div>
          {/* end prevalence */}
          <Divider />

          {/* symptoms */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
              "w-full"
            )}
          >
            <h3 className={clsx("text-[1.25rem] text-white font-bold")}>
              {symptoms.name}
            </h3>
            <Markdown markdown={symptoms.description} />
          </div>
          {/* end symptoms */}

          <Divider />

          {/* causes */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.75rem]",
              "w-full"
            )}
          >
            <h3 className={clsx("text-[1.25rem] text-white font-bold")}>
              {causes.name}
            </h3>
            <Markdown markdown={causes.description} />
          </div>
          {/* end causes */}
        </div>

        {/* end read more content */}
      </div>

      <button
        className={clsx("flex items-center justify-between", "w-full")}
        onClick={handleClickReadMore}
      >
        <div />

        <p className={clsx("text-[1.125rem] text-dartmouth-green font-bold")}>
          {readMode}
        </p>

        <div className={clsx(open ? "rotate-180" : "rotate-0")}>
          <SVGIcon
            name="Chevron"
            className={clsx(
              "w-[1.625rem] h-[1.625rem]",
              "fill-dartmouth-green"
            )}
          />
        </div>
      </button>
    </div>
  );
};
