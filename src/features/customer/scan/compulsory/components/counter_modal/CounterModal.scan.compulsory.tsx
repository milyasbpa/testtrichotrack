import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Modal } from "src/core/ui/components/modal";
import SVGIcon from "src/core/ui/icons";

export interface CounterModalCompulsoryScanProps {
  message?: string;
  description?: string;
  open?: boolean;
  delay?: number;
  onClose?: () => void;
}

export const CounterModalCompulsoryScan = ({
  message = "",
  description = "",
  open = false,
  delay = 1,
  onClose,
}: CounterModalCompulsoryScanProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      let timer1 = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, delay * 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [open]);
  return (
    <Modal className={clsx("!max-w-[500px]")} open={open} onClose={onClose}>
      <div
        ref={ref}
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[38px]",
          "p-[1.5rem]",
          "bg-eerie-black",
          "rounded-[0.5rem]"
        )}
      >
        <h3 className={clsx("text-[2rem] text-white-87 font-bold text-center")}>
          {message}
        </h3>

        <SVGIcon
          name="CheckCircle"
          className={clsx("w-[84px] h-[84px]", "fill-sea-green")}
        />

        <p className={clsx("text-[1.25rem] text-white-60 font-regular")}>
          {description}
        </p>
      </div>
    </Modal>
  );
};
