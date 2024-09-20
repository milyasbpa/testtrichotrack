import clsx from "clsx";
import { Button } from "src/core/ui/components/button";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StaffProfileActionEnum, StaffProfileContext } from "../../context";
import SVGIcon from "src/core/ui/icons";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { RouterFunctions } from "src/core/utils/router/functions";

export const FooterStaffProfile = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(StaffProfileContext);

  if (state.form.edit) {
    const handleClickBackEdit = () => {
      dispatch({
        type: StaffProfileActionEnum.SetFormData,
        payload: {
          ...state.form,
          edit: false,
        },
      });
    };

    const handleClickSubmit = () => {
      dispatch({
        type: StaffProfileActionEnum.OpenConfirmationModal,
      });
    };
    return (
      <div
        className={clsx(
          "grid grid-cols-2 gap-x-[1.5rem]",
          "w-full",
          "box-border"
        )}
      >
        <Button variant={"outlined"} onClick={handleClickBackEdit}>
          {dictionaries.actions.back.toUpperCase()}
        </Button>

        <Button
          // disabled={isSubmitDisabled}
          onClick={handleClickSubmit}
        >
          {dictionaries.actions.submit.toUpperCase()}
        </Button>
      </div>
    );
  }

  const handleClickEdit = () => {
    dispatch({
      type: StaffProfileActionEnum.SetFormData,
      payload: {
        ...state.form,
        edit: true,
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-x-[1.5rem]",
        "w-full",
        "box-border"
      )}
    >
      <Button
        variant={"outlined"}
        href={RouterFunctions.setBackURL({
          defaultURL: PrivateRouteURL.routeToStaffDashboardURL({
            locale: locale,
          }),
        })}
      >
        {dictionaries.actions.back.toUpperCase()}
      </Button>

      <Button variant="contained" onClick={handleClickEdit}>
        <div className={clsx("flex items-center gap-x-[0.5rem]")}>
          <SVGIcon
            name="Pencil"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
          />
          {dictionaries.actions.edit.toUpperCase()}
        </div>
      </Button>
    </div>
  );
};
