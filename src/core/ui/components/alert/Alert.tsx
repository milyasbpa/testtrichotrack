import * as React from "react";
import clsx from "clsx";
import { CloseIcon } from "../../icons/close";
import { SuccessIcon } from "../../icons/success";
import { InfoIcon } from "../../icons/info";
import { WarningIcon } from "../../icons/warning";
import { ErrorIcon } from "../../icons/error";

export interface AlertProps {
  id?: string | undefined;
  open?: boolean;
  message?: string;
  description?: string;
  variant?: "danger" | "warning" | "success" | "info";
  onClose?: () => void;
  timer?: number | null;
}

export const Alert = ({
  open = false,
  message = "",
  description = "",
  variant = "success",
  onClose = () => {},
  timer = 2000,
}: AlertProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && !!timer) {
      const timeout = setTimeout(() => {
        onClose();
        setIsOpen(false);
      }, timer);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-[1fr_auto]",
          "fixed right-0 top-0 left-0 z-[9999]",
          "items-center content-center justify-between justify-items-start",
          "p-[1rem]",
          variant === "danger"
            ? "bg-unbleached-silk"
            : variant === "warning"
            ? "bg-blanched-yellow"
            : variant === "success"
            ? "bg-aero-blue-2"
            : "bg-azureish-white",
          isOpen ? "block" : "hidden"
        )}
      >
        <div
          className={clsx(
            "grid items-start content-start justify-start justify-items-start gap-x-[0.5rem] grid-cols-[auto_1fr]"
          )}
        >
          <div className={clsx("pt-[0.25rem]")}>
            {variant === "success" ? (
              <SuccessIcon
                className={clsx("w-[1.375rem] h-[1.375rem]", "fill-[#1F8447]")}
              />
            ) : variant === "warning" ? (
              <WarningIcon
                className={clsx("w-[1.375rem] h-[1.375rem]", "fill-[#A97900]")}
              />
            ) : variant === "danger" ? (
              <ErrorIcon
                className={clsx("w-[1.375rem] h-[1.375rem]", "fill-[#9A2C14]")}
              />
            ) : (
              <InfoIcon
                className={clsx("w-[1.375rem] h-[1.375rem]", "fill-[#1F3B84]")}
              />
            )}
          </div>

          <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
            <h1
              className={clsx(
                "text-[1.125rem] font-bold",
                variant === "danger"
                  ? "text-deep-dumpling"
                  : variant === "warning"
                  ? "text-gold"
                  : variant === "info"
                  ? "text-cornflower-blue"
                  : "text-salem"
              )}
            >
              {message}
            </h1>
            {description.length > 0 && (
              <h2
                className={clsx(
                  "text-[0.875rem] font-regular",
                  variant === "danger"
                    ? "text-deep-dumpling"
                    : variant === "warning"
                    ? "text-gold"
                    : variant === "info"
                    ? "text-cornflower-blue"
                    : "text-salem"
                )}
              >
                {description}
              </h2>
            )}
          </div>
        </div>

        <button onClick={handleClose}>
          <CloseIcon
            className={clsx(
              "w-[1.375rem] h-[1.375rem]",
              variant === "danger"
                ? "fill-[#9A2C14]"
                : variant === "success"
                ? "fill-[#1F8447]"
                : variant === "warning"
                ? "fill-[#A97900]"
                : "fill-white"
            )}
          />
        </button>
      </div>
    </>
  );
};
