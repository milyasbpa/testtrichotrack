import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";
import { StaffEditContext } from "../../contexts/Edit.staff.context";
import { StaffEditActionEnum } from "../../contexts/Edit.staff.types";
import { StaffEditReactQueryKey } from "../keys";
import { AppContext } from "src/core/modules/app/context";

export const useStaffEditGetOutlets = () => {
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffEditContext);

  let skip = 0;
  const LIMIT = 50;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: StaffEditReactQueryKey.GetOutlets(),
    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetOutletsRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
      };

      return fetchGetOutlets(newPayload);
    },
    retry: 0,
    enabled: appState.auth.role !== "EMPLOYEE",
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * LIMIT;
      return pageParams.length * LIMIT;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: StaffEditActionEnum.SetFormData,
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
      let payload: {
        id: string;
        name: string;
      }[] = [];
      if (data?.pages !== undefined) {
        for (let i = 0; i < data?.pages?.length; i++) {
          for (let j = 0; j < data?.pages[i].length; j++) {
            payload = [
              ...payload,
              {
                id: String(data?.pages[i][j]?.id ?? ""),
                name: data?.pages[i][j]?.name,
              },
            ];
          }
        }
      }
      dispatch({
        type: StaffEditActionEnum.SetFormData,
        payload: {
          ...state.form,
          outlets: {
            ...state.form.outlets,
            data: payload,
          },
        },
      });
    }
  }, [query.data]);

  return query;
};
