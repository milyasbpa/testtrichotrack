import clsx from "clsx";

export interface NoReportItemAppProps {
  message?: string;
  description?: string;
  image_url?: string;
}

export const NoReportItemApp = ({
  message = "",
  description = "",
  image_url = "",
}: NoReportItemAppProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-y-[2.25rem]",
        "w-full",
        "box-border"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
          "w-full"
        )}
      >
        <h3
          className={clsx(
            "text-center text-[0.875rem] text-white-87 font-bold"
          )}
        >
          {message}
        </h3>

        <img src={image_url} className={clsx("w-[100px] h-[100px]")} />
      </div>

      <p
        className={clsx(
          "text-center text-[0.625rem] text-white-60 font-regular"
        )}
      >
        {description}
      </p>
    </div>
  );
};
