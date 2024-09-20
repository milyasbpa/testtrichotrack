import { useContext } from "react";
import { Modal } from "src/core/ui/components/modal";
import { CustomerIssueActionEnum, CustomerIssueContext } from "../../context";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Button } from "src/core/ui/components/button";
import SVGIcon from "src/core/ui/icons";
import { ImageCanvas } from "src/core/ui/components/image_canvas";

export const LevelInfoCustomerIssue = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CustomerIssueContext);

  const isOpen = !!state.level_info.selected;

  const handleClose = () => {
    dispatch({
      type: CustomerIssueActionEnum.SetLevelInfoValue,
      payload: {
        ...state.level_info,
        data: null,
        selected: null,
      },
    });
  };
  const width = 248;
  const height = (width / 3) * 4;
  return (
    <Modal
      className={clsx("max-w-[60%]", "!bg-[#1B1B1B]")}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "p-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-between justify-items-start",
              "w-full"
            )}
          >
            <p className={clsx("text-[0.875rem] text-white-87 font-bold")}>
              {state.level_info.data?.level}
            </p>
            <Button variant="icon" onClick={handleClose}>
              <SVGIcon
                name="Close"
                className={clsx("w-[1rem] h-[1rem]", "fill-[white]")}
              />
            </Button>
          </div>

          <p className={clsx("text-[0.875rem] text-white-87 font-normal")}>
            {state.level_info.data?.description}
          </p>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]"
          )}
        >
          <p className={clsx("text-[0.875rem] text-white-87 font-bold")}>
            {dictionaries.level_info.example.label}
          </p>
          <div
            className={clsx(
              "grid grid-flow-col place-content-start place-items-start gap-[1rem]",
              "w-full",
              "relative",
              "overflow-auto"
            )}
          >
            {state.level_info.data?.examples.map((item, index) => (
              <div
                className={clsx(
                  "w-full",
                  "relative",
                  "box-border",
                  "rounded-[0.5rem]",
                  "overflow-hidden"
                )}
                style={{
                  height: height,
                  width: width,
                }}
              >
                <ImageCanvas
                  key={index}
                  image_url={item}
                  rotation={90}
                  height={height}
                  width={width}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
