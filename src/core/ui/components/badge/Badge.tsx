import clsx from "clsx";
import SVGIcon from "../../icons";
import { useEffect, useState } from "react";

export interface BadgeProps {
  variant?: "info" | "error" | "success";
  open?: boolean;
  message?: string;
  closeable?: boolean;
  onClose?: () => void;
}

export const Badge = ({
  open = false,
  variant = "info",
  message = "",
  closeable = true,
  onClose = () => {},
}: BadgeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <div
      className={clsx(
        isOpen ? "flex" : "hidden",
        "items-center justify-between",
        "w-full",
        variant === "error" ? "bg-[#FAD9D2]" : "bg-azureish-white",
        "p-[0.75rem]",
        "rounded-[0.5rem]",
        variant === "error" && "border border-[#C03719]"
      )}
    >
      <div className={clsx("flex items-center justify-start gap-x-[0.5rem]")}>
        <SVGIcon
          name={variant === "error" ? "Warning" : "ExclamationCircle"}
          className={clsx(
            "w-[1rem] h-[1rem]",
            variant === "error" ? "fill-[#C03719]" : "fill-cornflower-blue"
          )}
        />
        <p
          className={clsx(
            "text-[0.875rem] font-regular",
            variant === "error" ? "text-[#C03719]" : "text-cornflower-blue"
          )}
        >
          {message}
        </p>
      </div>

      {closeable && (
        <button onClick={handleClose} className={clsx("cursor-pointer")}>
          <SVGIcon
            name="Close"
            className={clsx("w-[1rem] h-[1rem]", "fill-cornflower-blue")}
          />
        </button>
      )}
    </div>
  );
};
