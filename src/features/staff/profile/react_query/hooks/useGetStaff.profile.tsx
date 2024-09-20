import { useQuery } from "@tanstack/react-query";
import { fetchGetStaff } from "src/core/services/staff";
import { useContext, useEffect } from "react";
import {
  GetStaff200SuccessResponseInterface,
  GetStaffRequestInterface,
} from "src/core/models/api/staff";
import { StaffProfileActionEnum } from "../../context/Profile.staff.types";
import { AppContext } from "src/core/modules/app/context";
import { StaffProfileContext } from "../../context/Profile.staff.context";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { StaffProfileReactQueryKey } from "../keys";
import { useParams } from "react-router-dom";

export const useStaffProfileGetStaff = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);

  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffProfileContext);

  const payload: GetStaffRequestInterface = {
    staff_id: appState.user.staff?.id ?? -1,
  };

  const query = useQuery<GetStaff200SuccessResponseInterface>({
    queryKey: StaffProfileReactQueryKey.GetStaff(),
    queryFn: () => {
      return fetchGetStaff(payload);
    },
    enabled:
      appState.auth.role !== "ADMIN"
        ? !!appState.user.staff && state.form.outlets.data.length > 0
        : !!appState.user.staff,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      if (appState.auth.role === "ADMIN") {
        dispatch({
          type: StaffProfileActionEnum.SetFormData,
          payload: {
            ...state.form,
            photo_profile: {
              ...state.form.photo_profile,
              value:
                data.photo !== undefined && data.photo !== null
                  ? data.photo
                  : "",
              initial: data?.name !== undefined ? data?.name?.charAt(0) : "",
            },
            fullname: {
              ...state.form.fullname,
              value: data.name,
            },
            password: {
              ...state.form.password,
              value: "",
            },
            phonenumber: {
              ...state.form.phonenumber,
              value:
                data.mobile === undefined
                  ? appDictionaries.phone_number.items.find(
                      (item) => item.id === "+65"
                    )?.id ?? ""
                  : data.mobile === null
                  ? appDictionaries.phone_number.items.find(
                      (item) => item.id === "+65"
                    )?.id ?? ""
                  : `${
                      appDictionaries.phone_number.items.find(
                        (item) => item.id === `+${data.mobile?.slice(0, 2)}`
                      )?.id ?? ""
                    }${data.mobile.slice(3)}`,
            },
          },
        });
      } else {
        dispatch({
          type: StaffProfileActionEnum.SetFormData,
          payload: {
            ...state.form,
            photo_profile: {
              ...state.form.photo_profile,
              value:
                data.photo !== undefined && data.photo !== null
                  ? data.photo
                  : "",
              initial: data?.name !== undefined ? data?.name?.charAt(0) : "",
            },
            fullname: {
              ...state.form.fullname,
              value: data.name,
            },
            password: {
              ...state.form.password,
              value: "",
            },
            permission: {
              ...state.form.permission,
              selected:
                appDictionaries.permission.staffs.items.find(
                  (item) => item.id === data.permission
                ) ?? null,
            },
            outlets: {
              ...state.form.outlets,
              selected: {
                ...state.form.outlets.selected,
                id: String(data.outlet_id),
                name:
                  state.form.outlets.data.find(
                    (item) => parseInt(item.id) === data.outlet_id
                  )?.name ?? "",
              },
            },
            position: {
              ...state.form.position,
              value:
                data.position !== undefined && data.position !== null
                  ? data.position
                  : "",
            },
            phonenumber: {
              ...state.form.phonenumber,
              value:
                data.mobile === undefined
                  ? appDictionaries.phone_number.items.find(
                      (item) => item.id === "+65"
                    )?.id ?? ""
                  : data.mobile === null
                  ? appDictionaries.phone_number.items.find(
                      (item) => item.id === "+65"
                    )?.id ?? ""
                  : `${
                      appDictionaries.phone_number.items.find(
                        (item) => item.id === `+${data.mobile?.slice(0, 2)}`
                      )?.id ?? ""
                    }${data.mobile.slice(3)}`,
            },
          },
        });
      }
    }
  }, [query.data]);

  return query;
};
