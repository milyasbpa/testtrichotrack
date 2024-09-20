import { useQuery } from "@tanstack/react-query";
import { fetchGetStaff } from "src/core/services/staff";
import { useContext, useEffect } from "react";
import { StaffEditContext } from "src/features/staff/edit/contexts/Edit.staff.context";
import {
  GetStaff200SuccessResponseInterface,
  GetStaffRequestInterface,
} from "src/core/models/api/staff";
import { StaffEditActionEnum } from "../../contexts/Edit.staff.types";
import { StaffEditReactQueryKey } from "../keys";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";

export const useEditGetStaff = () => {
  const { state, dispatch } = useContext(StaffEditContext);
  const { locale, staffID } = useParams();
  const appDictionaries = getAppDictionaries(locale);

  const query = useQuery<GetStaff200SuccessResponseInterface>({
    queryKey: StaffEditReactQueryKey.GetStaff(),
    queryFn: () => {
      const payload: GetStaffRequestInterface = {
        staff_id: !staffID ? -1 : parseInt(staffID),
      };
      return fetchGetStaff(payload);
    },
    enabled: !!staffID && !!state.form.outlets.data.length,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;

      dispatch({
        type: StaffEditActionEnum.SetFormData,
        payload: {
          ...state.form,
          photo_profile: {
            ...state.form.photo_profile,
            value:
              data.photo !== undefined && data.photo !== null ? data.photo : "",
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
  }, [query.data]);

  return query;
};
