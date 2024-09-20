import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";
import { StaffAddContext, StaffAddActionEnum } from "../../contexts";
import { StaffAddReactQueryKey } from "../keys";

export const useStaffAddGetOutlets = () => {
  const { state, dispatch } = useContext(StaffAddContext);

  let skip = 0;
  const LIMIT = 6;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: StaffAddReactQueryKey.GetOutlets({
      limit: LIMIT,
      search: state.form.outlets.query,
    }),
    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetOutletsRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
        search: state.form.outlets.query,
      };

      return fetchGetOutlets(newPayload);
    },
    initialPageParam: 0,

    retry: 0,
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
          type: StaffAddActionEnum.SetFormData,
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
                id: String(data?.pages[i][j]?.id),
                name: data?.pages[i][j]?.name,
              },
            ];
          }
        }
      }

      dispatch({
        type: StaffAddActionEnum.SetFormData,
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
