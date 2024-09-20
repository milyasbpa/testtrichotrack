import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import moment from "moment";
import { BottomSheet, BottomSheetProps } from "../bottom_sheet";
import { Button } from "../button";
import { MoonLoader } from "../moon_loader";

export interface OTPBottomSheetProps extends BottomSheetProps {
  title?: string;
  message?: string;
  description?: string;
  error?: null | {
    message: string;
  };
  cta?: {
    primary: {
      children: React.ReactNode;
      onClick: () => void;
    };
  };
  onSubmit?: (value: string) => void;
}

export const OTPBottomSheet = ({
  open = false,
  onClose = () => {},
  title = "",
  message = "",
  description = "",
  error = null,
  cta = {
    primary: {
      children: "",
      onClick: () => {},
    },
  },
  onSubmit = () => {},
}: OTPBottomSheetProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);
  // NOTES: input state
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [active, setActive] = useState(0);
  const [backspaceKey, setBackspaceKey] = useState<boolean>(false);

  // NOTES: timer state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [startTime, setStartTime] = useState<moment.Moment>(moment());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setBackspaceKey(true);
      setValues(values.map((item, id) => (id === active ? "" : item)));
      setActive(active === 0 ? 0 : active - 1);
    } else {
      setBackspaceKey(false);
      // check is non number
      if (isNaN(parseInt(e.key))) {
        setActive(active);
      } else {
        setValues(values.map((item, id) => (id === active ? e.key : item)));
        setActive(active < 5 ? active + 1 : 5);
      }
    }
  };

  // NOTES: input otp state
  useEffect(() => {
    if (values[5].length === 0 && backspaceKey) {
      setActive(active === 0 ? 0 : active - 1);
    } else if (
      values[active].length === 0 &&
      backspaceKey &&
      values[active + 1].length === 0
    ) {
      setActive(active === 0 ? 0 : active - 1);
    } else if (
      values[active].length === 0 &&
      backspaceKey &&
      values[active + 1].length !== 0
    ) {
      setActive(active < 5 ? active + 1 : active);
    }
  }, [backspaceKey, values]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(parseInt(e.target.id));
  };

  // NOTE: to focus input when type otp
  useEffect(() => {
    if (ref.current !== undefined && ref.current !== null) {
      ref.current.focus();
    }
  }, [active]);

  const pinLength = Array.from({ length: 6 }, (_, i) => i);

  // NOTE: to count timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        const now = moment();
        const diff = 60 - now.diff(startTime, "seconds");

        if (diff <= 0) {
          setTimeLeft(0);
          clearInterval(timer);
        } else {
          setTimeLeft(diff);
        }
      }, 1000);
    }

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const handleClickSendOTP = () => {
    setStartTime(moment());
    setTimeLeft(60);
    setIsRunning(true);
    cta.primary.onClick();
  };

  const handleOpenTimer = () => {
    setValues(["", "", "", "", "", ""]);
    setActive(0);
    setStartTime(moment());
    setTimeLeft(60);
    setIsRunning(true);
  };

  const handleCloseTimer = () => {
    setIsRunning(false);
    onClose();
  };

  // NOTE: listener to to handle open timer
  useEffect(() => {
    if (open) {
      handleOpenTimer();
    } else {
      handleCloseTimer();
    }
  }, [open]);

  // NOTE: listener to submit OTP
  useEffect(() => {
    const newOTP = values.join("");
    if (newOTP.length === 6 && timeLeft > 0) {
      onSubmit(newOTP);
    }
  }, [values]);

  // Format time in MM:SS
  const formatTimeLeft = (seconds: number) => {
    const duration = moment.duration(seconds, "seconds");
    const minutes = String(Math.floor(duration.asMinutes())).padStart(2, "0");
    const secs = String(duration.seconds()).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  useEffect(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setOrientation("portrait");
    } else {
      setOrientation("landscape");
    }
  }, [window.matchMedia("(orientation: portrait)").matches]);

  return (
    <BottomSheet open={open} onClose={handleCloseTimer}>
      <div
        className={clsx(
          "flex justify-start items-start flex-col gap-[1.5rem]",
          "w-full h-auto",
          "box-border",
          orientation === "portrait" && "min-h-[60vh]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-y-[1.5rem]",
            "box-border",
            "w-full"
          )}
        >
          <h3
            className={clsx("text-[2rem] text-white-87 text-center font-bold")}
          >
            {title}
          </h3>

          <div
            className={clsx(
              "grid grid-cols-1 justify-center justify-items-center gap-y-[1rem]"
            )}
          >
            <p
              className={clsx(
                "text-[1.25rem] text-white-60 text-left font-regular"
              )}
            >
              {message}
            </p>

            <p
              className={clsx(
                "text-[1.25rem] text-go-green text-left font-bold"
              )}
            >
              {description}
            </p>
          </div>

          <div
            className={clsx(
              "grid grid-cols-[repeat(6,auto)] justify-center justify-items-center gap-[1.5rem]"
            )}
          >
            {pinLength.map((item) => (
              <div
                key={item}
                className={clsx(
                  "grid place-content-center place-items-center",
                  "bg-dark-charcoal",
                  "w-[100px] h-[100px] rounded-[0.5rem]",
                  !!error
                    ? "border border-dark-pastel-red"
                    : "border border-dark-charcoal"
                )}
              >
                <input
                  id={String(item)}
                  ref={active === item ? ref : null}
                  autoFocus={active === item}
                  type={"number"}
                  className={clsx(
                    "text-[2rem] leading-[44px] font-bold text-[white]",
                    "grid place-content-center place-items-center",
                    "w-[1.25rem]",
                    "bg-transparent",
                    "outline-none",
                    "border-[0px]"
                  )}
                  maxLength={1}
                  value={values[item]}
                  onFocus={handleFocus}
                  onKeyDown={handleKeyDown}
                />
              </div>
            ))}
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 justify-center justify-items-center gap-y-[1rem]"
            )}
          >
            {timeLeft > 0 && (
              <>
                <p
                  className={clsx(
                    "text-[1.25rem] text-white-60 text-left font-regular"
                  )}
                >
                  {error?.message}
                </p>

                <div
                  className={clsx(
                    "grid grid-cols-[auto_auto] justify-center justify-items-center gap-x-[1rem]"
                  )}
                >
                  <MoonLoader color={"#017948"} />
                  <p
                    className={clsx(
                      "text-[1.25rem] text-go-green text-left font-bold"
                    )}
                  >
                    {formatTimeLeft(timeLeft)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {timeLeft <= 0 && (
          <Button variant={"contained"} onClick={handleClickSendOTP}>
            {cta.primary.children}
          </Button>
        )}
      </div>
    </BottomSheet>
  );
};
