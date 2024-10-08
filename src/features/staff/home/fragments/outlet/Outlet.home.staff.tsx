import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useStaffHomeGetAllOutlets } from "../../react_query/hooks/useGetAllOutlets.home.staff";
import { useParams } from "react-router-dom";
import { StaffHomeActionEnum, StaffHomeContext } from "../../context";
import SVGIcon from "src/core/ui/icons";
import { Skeleton } from "src/core/ui/components/skeleton";

export const OutletStaffHome = () => {
  const { locale } = useParams();
  const { state, dispatch } = React.useContext(StaffHomeContext);
  const dictionaries = getDictionaries(locale);
  const { isLoading: isLoadingGetOutlet } = useStaffHomeGetAllOutlets();

  const outletName = state.outlet.form.selected?.name ?? "-";

  const handleClickChangeOutlet = () => {
    dispatch({
      type: StaffHomeActionEnum.SetOutletData,
      payload: {
        ...state.outlet,
        form: {
          ...state.outlet.form,
          is_open: true,
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start",
        "w-full",
        "py-[1rem] px-[2rem]"
      )}
    >
      {/* outlet name */}
      <div
        className={clsx(
          "grid grid-cols-[3rem_1fr] items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {/* icon */}
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[3rem] h-[3rem]",
            "rounded-[50%]",
            "bg-[#1B1B1B]"
          )}
        >
          <SVGIcon
            name={dictionaries.outlet.image_url as any}
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[white]")}
          />
        </div>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[0.875rem] text-[#FFFFFF99] font-normal")}>
            {dictionaries.outlet.label}
          </p>
          {isLoadingGetOutlet ? (
            <Skeleton width={100} />
          ) : (
            <p className={clsx("text-[1rem] text-[#FAFAFA] font-semibold")}>
              {outletName}
            </p>
          )}
        </div>
      </div>

      {/* change outlet */}
      <button
        className={clsx(
          "text-[#017747] text-[1rem] font-bold",
          "px-[1rem] py-[0.75rem]"
        )}
        onClick={handleClickChangeOutlet}
      >
        {dictionaries.outlet.cta.primary.children}
      </button>
    </div>
  );
};
