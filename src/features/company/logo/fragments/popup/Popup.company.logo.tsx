import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyLogoContext, CompanyLogoActionEnum } from "../../contexts";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { getDictionaries } from "../../i18n";
import clsx from "clsx";
import { Modal } from "src/core/ui/components/modal";
import { DialogTitle } from "@headlessui/react";
import SVGIcon from "src/core/ui/icons";

export const PopupCompanyLogo = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(CompanyLogoContext);

  const handleClose = () => {
    dispatch({
      type: CompanyLogoActionEnum.SetModalData,
      payload: {
        ...state.notifications.modal,
        open: false,
      },
    });
    navigate(
      PrivateRouteURL.routeToStaffDashboardURL({
        locale: locale,
      })
    );
  };
  return (
    <Modal open={state.notifications.modal.open} onClose={handleClose}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
          "w-full"
        )}
      >
        <button
          className={clsx("absolute", "top-[38px] right-[1.5rem]")}
          onClick={handleClose}
        >
          <SVGIcon
            name="Close"
            className={clsx("w-[2rem] h-[2rem]", "fill-[white]")}
          />
        </button>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "px-[2rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-between justify-items-start",
              "w-full",
              "px-[2rem] pt-[2rem]"
            )}
          >
            <DialogTitle
              className={clsx("font-bold text-[white] text-[2rem] text-center")}
            >
              {dictionaries.success_dialog.message}
            </DialogTitle>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-[2rem]",
              "w-full"
            )}
          >
            <p className={clsx("text-[1.25rem] font-regular text-white-60")}>
              {dictionaries.success_dialog.description}
            </p>

            <img src={dictionaries.success_dialog.image_url} />
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 gap-x-[1.5rem] place-content-start place-items-start",
            "w-full",
            "p-[2rem]"
          )}
        >
          <button
            type="button"
            className={clsx(
              "inline-flex w-full justify-center border border-philippine-green rounded-[0.75rem] bg-dartmouth-green px-[1rem] py-[1rem]",
              "text-sm font-bold text-white uppercase"
            )}
            onClick={handleClose}
          >
            {dictionaries.success_dialog.close}
          </button>
        </div>
      </div>
    </Modal>
  );
};
