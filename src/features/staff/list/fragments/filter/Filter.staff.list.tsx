import { useContext, useEffect } from "react";
import clsx from "clsx";
import { StaffListContext } from "../../contexts/StaffList.context";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { AppContext } from "src/core/modules/app/context";
import { Autocomplete } from "src/core/ui/components/autocomplete";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";

export const FilterStaffList = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const dictionaries = getDictionaries(locale);
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffListContext);

  // TODO: need to test role instead Admin
  useEffect(() => {
    dispatch({
      type: StaffListActionEnum.SetData,
      payload: {
        ...state.data,
        outlets: {
          ...state.data.outlets,
          selected:
            appDictionaries.permission.outlets.items.find(
              (_, index) => index === 0
            ) ?? null,
        },
        permissions: {
          ...state.data.permissions,
          selected:
            appDictionaries.permission.staffs.items.find(
              (_, index) => index === 0
            ) ?? null,
        },
      },
    });
  }, []);

  const outlets = [
    ...appDictionaries.permission.outlets.items,
    ...state.data.outlets.data,
  ];

  const permissions = appDictionaries.permission.staffs.items;

  const handleChangeOutlet = (data: { id: string; name: string }) => {
    dispatch({
      type: StaffListActionEnum.SetData,
      payload: {
        ...state.data,
        outlets: {
          ...state.data.outlets,
          selected: data,
        },
      },
    });
  };

  const handleChangePermission = (data: { id: string; name: string }) => {
    dispatch({
      type: StaffListActionEnum.SetData,
      payload: {
        ...state.data,
        permissions: {
          ...state.data.permissions,
          selected: data,
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start w-full gap-x-[1rem]"
      )}
    >
      <Autocomplete
        label={dictionaries.outlet_autocomplete.label}
        selected={state.data.outlets.selected}
        items={outlets}
        disabled={appState.auth.role !== "ADMIN"}
        onSelect={handleChangeOutlet}
      />
      <Autocomplete
        label={dictionaries.permission_autocomplete.label}
        selected={state.data.permissions.selected}
        items={permissions}
        onSelect={handleChangePermission}
      />
    </div>
  );
};
