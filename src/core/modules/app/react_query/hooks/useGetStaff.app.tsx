import { useQuery } from "@tanstack/react-query";
import { AppReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { AxiosError } from "axios";
import { AppActionEnum, AppContext } from "../../context";
import Cookies from "universal-cookie";
import { fetchGetStaff } from "src/core/services/staff";
import {
  GetStaff200SuccessResponseInterface,
  GetStaffRequestInterface,
} from "src/core/models/api/staff";

// NOTE: Global listener from Backend API response to handle staff data
export const useAppGetStaff = () => {
  const { state, dispatch } = useContext(AppContext);

  const cookie = new Cookies();

  const staffToken = cookie.get("staff-token");

  const payload: GetStaffRequestInterface = {
    staff_id: state.user.staff?.id ?? -1,
  };

  const query = useQuery<GetStaff200SuccessResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetStaff(payload),
    queryFn: () => {
      return fetchGetStaff(payload);
    },

    enabled: typeof staffToken !== "undefined" && !!state.user.staff,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      if (!!staffToken) {
        dispatch({
          type: AppActionEnum.SetUserData,
          payload: {
            ...state.user,
            staff: {
              ...state.user.staff,
              mobile: data.mobile,
              name: data.name,
              permission: data.permission,
              photo: data.photo ?? null,
              reg_time: data.reg_time,
              status: data.status,
              position: data.position ?? null,
              outlet_id: data.outlet_id,
              id: data.id,
            },
            outlet: {
              ...state.user.outlet,
              base_id: data.outlet_id,
              current_id: data.outlet_id,
            },
          },
        });
      }
    }
  }, [query.data, staffToken, query.isFetching]);

  useEffect(() => {
    if (!!query.error && typeof staffToken !== "undefined") {
      const error = query.error;
      // NOTE: Global listener from Backend API 401 response
      if (
        error.response?.status === 403 &&
        (error.response.data as any)?.detail.toLowerCase() ===
          "credit points exhausted"
      ) {
        dispatch({
          type: AppActionEnum.SetErrorData,
          payload: {
            ...state.error,
            status: true,
            code: "credit_points_exhausted",
          },
        });
      }
      if (
        error.response?.status === 403 &&
        (error.response.data as any)?.detail.toLowerCase() ===
          "subscription expired"
      ) {
        dispatch({
          type: AppActionEnum.SetErrorData,
          payload: {
            ...state.error,
            status: true,
            code: "credit_points_exhausted",
          },
        });
      }
    }
  }, [query.error]);

  return query;
};
