import { useQuery } from "@tanstack/react-query";
import {
  GetReadUser200SuccessResponseInterface,
  GetReadUserRequestInterface,
} from "src/core/models/api/login";
import { fetchGetReadUser } from "src/core/services/login";
import { AppReactQueryKey } from "../keys";
import { useContext, useEffect } from "react";
import { AxiosError } from "axios";
import { AppActionEnum, AppAuthRole, AppContext } from "../../context";
import Cookies from "universal-cookie";
import { queryClient } from "src/core/utils/react_query";

// NOTE: Global listener from Backend API response to handle 401 auth error
// NOTE: Global listener from Backend API response to handle user data
export const useAppGetReadUserStaff = () => {
  const { state, dispatch } = useContext(AppContext);
  const cookie = new Cookies();
  const staffToken = cookie.get("staff-token");
  const customerToken = cookie.get("customer-token");
  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice());
  const payload: GetReadUserRequestInterface = {
    token: staffToken,
  };
  const query = useQuery<GetReadUser200SuccessResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetReadUserStaff(),
    queryFn: () => {
      return fetchGetReadUser(payload);
    },
    initialData: undefined,

    enabled: typeof staffToken !== "undefined" && !!device,
  });

  useEffect(() => {
    if (!!query.error && typeof staffToken !== "undefined") {
      const error = query.error;
      // NOTE: Global listener from Backend API 401 response
      if (error.response?.status === 401) {
        dispatch({
          type: AppActionEnum.SetErrorData,
          payload: {
            ...state.error,
            status: true,
            code: "session_timeout",
          },
        });
      }
    }
  }, [query.error]);

  // NOTES: Global listener to reset state logout state
  useEffect(() => {
    if (!staffToken) {
      dispatch({
        type: AppActionEnum.SetUserData,
        payload: {
          ...state.user,
          staff: null,
          customer: null,
          outlet: null,
        },
      });
    }
  }, [staffToken]);
  // END NOTES: Global listener to reset state logout state

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
              id: data.id,
            },
          },
        });
        dispatch({
          type: AppActionEnum.SetAuthData,
          payload: {
            ...state.auth,
            role: !!customerToken
              ? "CUSTOMER"
              : (data.permission.toUpperCase() as AppAuthRole),
          },
        });
      }
    }
  }, [query.data, query.isFetching]);

  return query;
};

// NOTE: Global listener from Backend API response to handle 401 auth error
// NOTE: Global listener from Backend API response to handle user data
export const useAppGetReadUserCustomer = () => {
  const { state, dispatch } = useContext(AppContext);
  const cookie = new Cookies();
  const customerToken = cookie.get("customer-token");
  const device = queryClient.getQueryData(AppReactQueryKey.GetDevice());
  const payload: GetReadUserRequestInterface = {
    token: customerToken,
  };
  const query = useQuery<GetReadUser200SuccessResponseInterface, AxiosError>({
    queryKey: AppReactQueryKey.GetReadUserCustomer(),
    queryFn: () => {
      return fetchGetReadUser(payload);
    },
    initialData: undefined,

    enabled:
      typeof customerToken !== "undefined" && !!device && !!state.user.staff,
  });

  useEffect(() => {
    if (!!query.error && typeof customerToken !== "undefined") {
      const error = query.error;
      // NOTE: Global listener from Backend API 401 response
      if (error.response?.status === 401) {
        dispatch({
          type: AppActionEnum.SetErrorData,
          payload: {
            ...state.error,
            status: true,
            code: "session_timeout",
          },
        });
      }
    }
  }, [query.error]);

  // NOTES: Global listener to reset state logout state
  useEffect(() => {
    if (!customerToken) {
      dispatch({
        type: AppActionEnum.SetUserData,
        payload: {
          ...state.user,
          customer: null,
        },
      });
    }
  }, [customerToken]);
  // END NOTES: Global listener to reset state logout state

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      if (!!customerToken) {
        dispatch({
          type: AppActionEnum.SetUserData,
          payload: {
            ...state.user,
            customer: {
              ...state.user.customer,
              id: data.id,
            },
          },
        });
        dispatch({
          type: AppActionEnum.SetAuthData,
          payload: {
            ...state.auth,
            role: data.permission.toUpperCase() as AppAuthRole,
          },
        });
      }
    }
  }, [query.data, query.isFetching]);

  return query;
};
