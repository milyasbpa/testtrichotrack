import clsx from "clsx";
import { BottomSheet } from "src/core/ui/components/bottom_sheet";

export interface UserGuideBottomSheetAppProps {
  title?: string;
  open: boolean;
  description: string;
  list: {
    id: string;
    name: string;
    file_url: string;
  }[];
  onClose?: () => void;
}

export const UserGuideBottomSheetApp = ({
  title = "",
  description = "",
  open = false,
  list = [],
  onClose = () => {},
}: UserGuideBottomSheetAppProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={handleClose}>
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
        {list.length > 0 &&
          list.map((item, index) => (
            <a
              key={index}
              className={clsx(
                "flex justify-between justify-items-start items-center content-center",
                "w-full",
                "p-[1.5rem]",
                "box-border",
                "text-[1rem] text-left text-white font-regular"
              )}
              href={item.file_url}
              download
              onClick={onClose}
            >
              {item.name}
            </a>
          ))}
      </div>
    </BottomSheet>
  );
};
