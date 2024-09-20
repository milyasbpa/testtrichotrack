import clsx from "clsx";
import { BottomSheet } from "src/core/ui/components/bottom_sheet";
import SVGIcon from "src/core/ui/icons";

export interface LanguageBottomSheetProps {
  title?: string;
  open: boolean;
  description: string;
  selected?: {
    id: string;
    name: string;
  } | null;
  items: {
    id: string;
    name: string;
  }[];
  selectedText?: string;
  onClose?: () => void;
  onSelect?: (_: { id: string; name: string }) => void;
}

export default function LanguageBottomSheet({
  title = "",
  description = "",
  selected = null,
  open = false,
  selectedText = "Selected",
  items = [],
  onClose = () => {},
  onSelect = (_: { id: string; name: string }) => {},
}: LanguageBottomSheetProps) {
  const handleSelect = (data: { id: string; name: string }) => {
    onSelect(data);
  };
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[2rem] font-bold text-white-87 text-left")}>
          {title}
        </p>

        <p
          className={clsx("text-[1.25rem] font-normal text-white-60 text-left")}
        >
          {description}
        </p>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 justify-start justify-items-start",
          "w-full max-h-[408px]",
          "overflow-scroll"
        )}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={clsx(
              "flex justify-between justify-items-start items-center content-center",
              "w-full",
              "border-b border-b-white-12",
              "p-[1.5rem]",
              "box-border"
            )}
            value={item.name}
            onClick={() => handleSelect(item)}
          >
            <div
              className={clsx(
                "grid grid-flow-col gap-x-[1rem] justify-start justify-items-start items-center content-center"
              )}
            >
              <SVGIcon
                name={"Check"}
                className={clsx(
                  selected?.id === item.id ? "block" : "hidden",
                  "w-[1.25rem] h-[1.25rem]",
                  "fill-go-green"
                )}
              />
              <p
                className={clsx(
                  "text-[1rem] text-left text-white font-regular"
                )}
              >
                {item.name}
              </p>
            </div>

            <p
              className={clsx(
                selected?.id === item.id ? "block" : "hidden",
                "text-[1rem] text-left text-go-green font-semibold"
              )}
            >
              {selectedText}
            </p>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
