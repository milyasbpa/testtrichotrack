import { DialogTitle } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { StaffHomeActionEnum, StaffHomeContext } from "../../context";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import SVGIcon from "src/core/ui/icons";
import { Textfield } from "src/core/ui/components/textfield";
import { Modal } from "src/core/ui/components/modal";
import { Button } from "src/core/ui/components/button";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const OutletFormStaffHome = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffHomeContext);

  const [query, setQuery] = useState<string>("");

  const availableItems = state.outlet.form.items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleClose = () => {
    setQuery("");
    dispatch({
      type: StaffHomeActionEnum.SetOutletData,
      payload: {
        ...state.outlet,
        form: {
          ...state.outlet.form,
          is_open: false,
        },
      },
    });
  };

  const handleSelectOutlet = (data: { id: string; name: string }) => {
    dispatch({
      type: StaffHomeActionEnum.SetOutletData,
      payload: {
        ...state.outlet,
        form: {
          ...state.outlet.form,
          selected: data,
        },
      },
    });
  };

  const handleClickCancel = () => {
    setQuery("");
    dispatch({
      type: StaffHomeActionEnum.SetOutletData,
      payload: {
        ...state.outlet,
        form: {
          ...state.outlet.form,
          is_open: false,
        },
      },
    });
  };

  const handleClickSave = () => {
    setQuery("");
    dispatch({
      type: StaffHomeActionEnum.SetOutletData,
      payload: {
        ...state.outlet,
        form: {
          ...state.outlet.form,
          is_open: false,
        },
      },
    });

    dispatchApp({
      type: AppActionEnum.SetUserData,
      payload: {
        ...appState.user,
        outlet: {
          ...appState.user.outlet,
          base_id: appState.user.outlet?.base_id ?? -1,
          current_id: parseInt(state.outlet.form.selected?.id ?? "-1"),
        },
      },
    });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Modal open={state.outlet.form.is_open} onClose={handleClose}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "w-full"
          )}
        >
          <DialogTitle className={clsx("font-bold text-[white] text-[1.5rem]")}>
            {dictionaries.outlet.form.title}
          </DialogTitle>

          <button onClick={handleClose}>
            <SVGIcon
              name="Close"
              className={clsx("w-[2rem] h-[2rem]", "fill-[white]")}
            />
          </button>
        </div>

        <Textfield
          label={dictionaries.outlet.form.search.label}
          placeholder={dictionaries.outlet.form.search.placeholder}
          onChange={handleChangeSearch}
        />

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full h-[200px]",
            "overflow-auto"
          )}
        >
          {/* list */}
          {availableItems.map((item, index) => (
            <button
              key={index}
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start",
                "w-full",
                state.outlet.form.selected?.id === item.id
                  ? "border border-[#01AC67]"
                  : "border border-[#262626]",
                state.outlet.form.selected?.id === item.id
                  ? "bg-[#B9FFE226]"
                  : "bg-[#262626]",
                "rounded-[0.5rem]",
                "p-[1rem]",
                "text-[1rem] font-semibold text-[white]"
              )}
              onClick={() => handleSelectOutlet(item)}
            >
              {item.name}
            </button>
          ))}
          {/* end list */}
        </div>
        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <Button variant={"outlined"} onClick={handleClickCancel}>
            {dictionaries.outlet.form.cta.secondary.children.toUpperCase()}
          </Button>
          <Button variant={"contained"} onClick={handleClickSave}>
            {dictionaries.outlet.form.cta.primary.children.toUpperCase()}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
