import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { StaffListContext } from "../../contexts/StaffList.context";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { DisplayListReactQueryKey } from "../keys";
import {
  GetStaffs200SuccessResponseInterface,
  GetStaffsRequestInterface,
} from "src/core/models/api/staff";
import { fetchGetStaffs } from "src/core/services/staff";

export const useDisplayGetStaffs = () => {
  const { state, dispatch } = useContext(StaffListContext);

  let skip = 0;
  const LIMIT = 12;
  const query = useInfiniteQuery<
    GetStaffs200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: DisplayListReactQueryKey.GetStaffs({
      search: state.data.search.value,
      sort_by: state.data.sort.by,
      target_outlet: !state.data.outlets.selected
        ? undefined
        : parseInt(state.data.outlets.selected.id),
      target_permission: state.data.permissions.selected?.id,
      limit: LIMIT,
    }),

    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetStaffsRequestInterface = {
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
        search: state.data.search.value,
        target_outlet:
          state.data.outlets.selected?.id === "All Outlets"
            ? undefined
            : parseInt(state.data.outlets.selected?.id ?? "-1"),
        target_permission:
          state.data.permissions.selected?.name === "All Permissions"
            ? undefined
            : state.data.permissions.selected?.name,
      };

      return fetchGetStaffs(newPayload);
    },
    retry: 0,
    enabled: !!state.data.outlets.selected && !!state.data.permissions.selected,
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * LIMIT;
      return pageParams.length * LIMIT;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      let payload: {
        id: number;
        name: string;
        initial: string;
        registration_time: string;
        photo: string;
        mobile: string;
        position: string;
        outlet: string;
      }[] = [];
      if (data?.pages !== undefined) {
        for (let i = 0; i < data?.pages?.length; i++) {
          for (let j = 0; j < data?.pages[i].length; j++) {
            payload = [
              ...payload,
              {
                id: data?.pages[i][j]?.id,
                name:
                  data?.pages[i][j]?.name.length >= 14
                    ? `${data?.pages[i][j]?.name.slice(0, 14)}...`
                    : data?.pages[i][j]?.name,
                registration_time: new Date(
                  data?.pages[i][j]?.reg_time
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                initial: data?.pages[i][j]?.name.slice(0, 1).toUpperCase(),
                photo:
                  data.pages[i][j].photo === null ? "" : data.pages[i][j].photo,
                mobile:
                  data.pages[i][j].mobile === null
                    ? "No phone number"
                    : data.pages[i][j].mobile,
                position: data.pages[i][j].position || "N.A",
                outlet: state.data.outlets.data.filter(
                  (outlet) => outlet.id === String(data.pages[i][j].outlet_id)
                )[0].name,
              },
            ];
          }
        }
      }
      dispatch({
        type: StaffListActionEnum.SetStaffList,
        payload: payload,
      });
    }
  }, [query.data]);

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
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
