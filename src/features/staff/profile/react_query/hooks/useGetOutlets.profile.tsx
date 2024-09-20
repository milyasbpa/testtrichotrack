import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";
import { StaffProfileContext } from "../../context/Profile.staff.context";
import { StaffProfileActionEnum } from "../../context/Profile.staff.types";
import { StaffProfileReactQueryKey } from "../keys";
import { AppContext } from "src/core/modules/app/context";

export const useStaffProfileGetOutlets = () => {
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffProfileContext);

  let skip = 0;
  const LIMIT = 50;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: StaffProfileReactQueryKey.GetOutlets(),
    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetOutletsRequestInterface = {
        skip: skip,
        limit: LIMIT,
      };

      return fetchGetOutlets(newPayload);
    },
    initialPageParam: 0,
    retry: 0,
    enabled: appState.auth.role === "MANAGER",
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * LIMIT;
      return pageParams.length * LIMIT;
    },
  });

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: StaffProfileActionEnum.SetFormData,
          payload: {
            ...state.form,
            outlets: {
              ...state.form.outlets,
              data: [],
            },
          },
        });
      }
    }
  }, [query.error]);

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      if (data?.pages?.length > 0) {
        let payload: {
          id: string;
          name: string;
        }[] = [];
        if (data?.pages !== undefined) {
          for (let i = 0; i < data?.pages?.length; i++) {
            for (let j = 0; j < (data?.pages as any)[i].length; j++) {
              payload = [
                ...payload,
                {
                  id: String((data?.pages as any)[i][j]?.id),
                  name: (data?.pages as any)[i][j]?.name,
                },
              ];
            }
          }
        }
        dispatch({
          type: StaffProfileActionEnum.SetFormData,
          payload: {
            ...state.form,
            outlets: {
              ...state.form.outlets,
              data: payload,
            },
          },
        });
      }
    }
  }, [query.data]);

  return query;
};
