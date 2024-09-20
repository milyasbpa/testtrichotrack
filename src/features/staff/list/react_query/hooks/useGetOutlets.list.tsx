import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { StaffListContext } from "../../contexts/StaffList.context";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { DisplayListReactQueryKey } from "../keys";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";

export const useDisplayGetOutlets = () => {
  const { state, dispatch } = useContext(StaffListContext);
  const LIMIT = 50;
  let skip = 0;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: DisplayListReactQueryKey.GetOutlets(),
    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetOutletsRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
        sort_by: state.data.sort.by.includes("Name Ascending")
          ? "name"
          : state.data.sort.by.includes("Name Descending")
          ? "name"
          : state.data.sort.by.includes("Registration Ascending")
          ? "reg_time"
          : state.data.sort.by.includes("Registration Descending")
          ? "reg_time"
          : "",
        ascending: state.data.sort.by.includes("Name Ascending")
          ? true
          : state.data.sort.by.includes("Name Descending")
          ? false
          : state.data.sort.by.includes("Registration Ascending")
          ? true
          : state.data.sort.by.includes("Registration Descending")
          ? false
          : false,
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
                id: String((data?.pages as any)[i][j]?.id),
                name: (data?.pages as any)[i][j]?.name,
              },
            ];
          }
        }
      }
      dispatch({
        type: StaffListActionEnum.SetOutletsData,
        payload: payload,
      });
    }
  }, [query.data]);

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: StaffListActionEnum.SetOutletsData,
          payload: [],
        });
      }
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: StaffListActionEnum.SetStaffList,
          payload: [],
        });
      }
    }
  }, [query.error]);

  return query;
};
