import * as React from "react";
import clsx from "clsx";
import { useDebounceCallback } from "usehooks-ts";
import { Skeleton } from "../skeleton";

// NOTES: if we use debounce please use e.target.value instead e.currentTarget.value

export interface TextfieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string | undefined;
  startAddornment?: React.ReactNode | undefined;
  endAddornment?: React.ReactNode | undefined;
  startHelper?: React.ReactNode;
  endHelper?: React.ReactNode;
  autoFocus?: boolean;
  variant?: "error" | "standard";
  debounce?: boolean;
  debounceTime?: number;
  loading?: boolean;
}

export const Textfield = ({
  label = "",
  startAddornment,
  endAddornment,
  startHelper,
  endHelper,
  variant = "standard",
  debounce = false,
  debounceTime = 500,
  type,
  value,
  loading = false,
  onChange = () => {},
  ...otherProps
}: TextfieldProps) => {
  const [textfieldValue, setTextfieldValue] = React.useState<
    string | number | readonly string[] | undefined
  >(value);
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const debounced = useDebounceCallback(onChange, debounceTime);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextfieldValue(e.currentTarget.value);
    if (debounce) {
      debounced(e);
    } else {
      onChange(e);
    }
  };

  React.useEffect(() => {
    setTextfieldValue(value);
  }, [value]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      {loading && label.length > 0 && <Skeleton width={100} height={20} />}
      {!loading && label.length > 0 && (
        <p className={clsx("text-[1rem] text-[white] font-bold")}>{label}</p>
      )}

      {loading ? (
        <div className={clsx("w-full")}>
          <Skeleton className={clsx("w-full")} height={48} />
        </div>
      ) : (
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
            "h-[52px]",
            "w-full"
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

            <input
              {...otherProps}
              type={type === "tel" ? "number" : type}
              className={clsx(
                "outline-none",
                "border-none",
                "w-full",
                "bg-transparent",
                "font-Manrope font-normal text-[1rem] leading-[1.25rem] text-[rgba(255,255,255,0.8)]",
                "disabled:text-[#666666]",
                "placeholder:text-[#666666]",
                "autofill:text-[rgba(255,255,255,0.8)]"
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
              value={textfieldValue}
              onChange={handleChange}
            />
          </div>

          {endAddornment && endAddornment}
        </div>
      )}

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start",
          "w-full"
        )}
      >
        {loading && startHelper && <Skeleton width={100} height={14} />}
        {!loading && startHelper && (
          <div
            className={clsx(
              "text-[0.75rem] font-normal",
              variant === "error" ? "text-deep-dumpling" : "text-white"
            )}
          >
            {startHelper}
          </div>
        )}

        {loading && endHelper && <Skeleton width={100} height={14} />}
        {!loading && endHelper && (
          <div className={clsx("text-white-60 text-[0.75rem] font-normal")}>
            {endHelper}
          </div>
        )}
      </div>
    </div>
  );
};
