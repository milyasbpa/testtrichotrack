import * as React from "react";
import clsx from "clsx";

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string | undefined;
  startAddornment?: React.ReactNode | undefined;
  endAddornment?: React.ReactNode | undefined;
  startHelper?: React.ReactNode;
  endHelper?: React.ReactNode;
  autoFocus?: boolean;
  variant?: "error" | "standard";
}

export const Textarea = ({
  label = "",
  startAddornment,
  endAddornment,
  startHelper,
  endHelper,
  variant = "standard",

  type,
  ...otherProps
}: TextareaProps) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      {label.length > 0 && (
        <p className={clsx("text-[1rem] text-[white] font-bold")}>{label}</p>
      )}

      <div
        className={clsx(
          "grid justify-between justify-items-start items-center content-center gap-[0.5rem]",
          endAddornment ? "grid-cols-[1fr_auto]" : "grid-cols-1",
          otherProps.disabled
            ? "border border-[rgba(255,255,255,0.05)]"
            : variant === "error"
            ? "border border-[#9a2c14]"
            : isFocus
            ? "border border-[#017948]"
            : "border border-[rgba(255,255,255,0.05)]",
          otherProps.disabled ? "bg-[#1F1F1F]" : "bg-[#262626]",
          type === "tel" ? "pr-[1rem]" : "px-[1rem]",
          "rounded-[0.5rem]",
          "w-full",

          "box-border"
        )}
      >
        <div
          className={clsx(
            "grid justify-start justify-items-start items-center content-center gap-[0.5rem]",
            "w-full",
            startAddornment ? "grid-cols-[auto_1fr]" : "grid-cols-1"
          )}
        >
          {startAddornment && startAddornment}

          <textarea
            {...otherProps}
            className={clsx(
              "outline-none",
              "border-none",
              "w-full",
              "bg-transparent",
              "font-Manrope font-normal text-[1rem] leading-[1.25rem] text-[rgba(255,255,255,0.8)]",
              "disabled:text-[#666666]",
              "placeholder:text-[#666666]",
              "autofill:text-[rgba(255,255,255,0.8)]",
              "resize-none",
              "h-[190px]",
              "py-[1rem]"
            )}
            onFocus={(e) => {
              if (otherProps.onFocus) {
                otherProps.onFocus(e);
              }
              setIsFocus(true);
            }}
            onBlur={(e) => {
              if (otherProps.onBlur) {
                otherProps.onBlur(e);
              }
              setIsFocus(false);
            }}
          />
        </div>

        {endAddornment && endAddornment}
      </div>

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start",
          "w-full"
        )}
      >
        {startHelper && (
          <div
            className={clsx(
              "text-[0.75rem] font-normal",
              variant === "error" ? "text-deep-dumpling" : "text-white"
            )}
          >
            {startHelper}
          </div>
        )}

        {endHelper && (
          <div className={clsx("text-white-60 text-[0.75rem] font-normal")}>
            {endHelper}
          </div>
        )}
      </div>
    </div>
  );
};
