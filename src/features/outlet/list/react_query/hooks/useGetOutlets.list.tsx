import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OutletListContext } from "../../contexts/OutletList.context";
import { OutletListActionEnum } from "../../contexts/OutletList.types";
import { DisplayListReactQueryKey } from "../keys";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";

export const useDisplayGetOutlets = () => {
  const { state, dispatch } = useContext(OutletListContext);

  let skip = 0;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: DisplayListReactQueryKey.GetOutlets({
      search: state.data.search.value,
      limit: 6,
      sort_by: state.data.sort.by,
    }),

    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;
      const LIMIT = 6;
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
        search: !state.data.search.value.length
          ? undefined
          : state.data.search.value,
      };

      return fetchGetOutlets(newPayload);
    },
    retry: 0,
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * 6;
      return pageParams.length * 6;
    },
    initialPageParam: 0,
    // onError(err) {
    //   if (err.response?.statusText === "Unauthorized") {
    //     dispatchAuth({
    //       type: AuthActionEnum.SetSessionValue,
    //       payload: {
    //         ...authState.session,
    //         client: true,
    //         staff: false,
    //         customer: undefined,
    //       },
    //     });
    //   } else if (
    //     (
    //       err.response as { data: { detail: string } } | undefined
    //     )?.data.detail.toLowerCase() === "subscription expired"
    //   ) {
    //     navigate(getClientDeactivateAccountUrl(locale));
    //   } else if (
    //     (
    //       err.response as { data: { detail: string } } | undefined
    //     )?.data.detail.toLowerCase() === "credit points exhausted"
    //   ) {
    //     navigate(getClientDeactivateAccountUrl(locale));
    //   }

    //   if (err.response?.status === 404 && skip === 0) {
    //     dispatch({
    //       type: OutletListActionEnum.SetOutletList,
    //       payload: [],
    //     });
    //   }
    // },
    // onSuccess(data) {
    //   if (data !== undefined && data?.pages?.length > 0) {
    //     let payload: {
    //       id: number;
    //       name: string;
    //       address: string;
    //       initial: string;
    //       registration_time: string;
    //       photo: string;
    //       mobile: string;
    //     }[] = [];
    //     if (data?.pages !== undefined) {
    //       for (let i = 0; i < data?.pages?.length; i++) {
    //         for (let j = 0; j < data?.pages[i].length; j++) {
    //           payload = [
    //             ...payload,
    //             {
    //               id: data?.pages[i][j]?.id,
    //               name:
    //                 data?.pages[i][j]?.name?.length > 13
    //                   ? `${data?.pages[i][j]?.name?.slice(0, 13)}...`
    //                   : data?.pages[i][j]?.name,
    //               registration_time: new Date(
    //                 data?.pages[i][j]?.reg_time
    //               ).toLocaleDateString("en-US", {
    //                 month: "short",
    //                 day: "numeric",
    //                 year: "numeric",
    //               }),
    //               address: !data?.pages[i][j]?.address?.length
    //                 ? "N.A"
    //                 : data?.pages[i][j]?.address?.length > 19
    //                 ? `${data?.pages[i][j]?.address?.slice(0, 19)}...`
    //                 : data?.pages[i][j]?.address,
    //               initial: data?.pages[i][j]?.name.slice(0, 1).toUpperCase(),
    //               photo:
    //                 data.pages[i][j].photo === null
    //                   ? ""
    //                   : data.pages[i][j].photo,
    //               mobile:
    //                 data.pages[i][j].mobile === null
    //                   ? "No phone number"
    //                   : data.pages[i][j].mobile,
    //             },
    //           ];
    //         }
    //       }
    //     }
    //     dispatch({
    //       type: OutletListActionEnum.SetOutletList,
    //       payload: payload,
    //     });
    //   }
    // },
  });

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: OutletListActionEnum.SetOutletList,
          payload: [],
        });
      }
    }
  }, [query.error]);

  useEffect(() => {
    const data = query.data;

    if ((data?.pages as any)?.length > 0) {
      let payload: {
        id: number;
        name: string;
        address: string;
        initial: string;
        registration_time: string;
        photo: string;
        mobile: string;
      }[] = [];
      if (data?.pages !== undefined) {
        for (let i = 0; i < data?.pages?.length; i++) {
          for (let j = 0; j < data?.pages[i].length; j++) {
            payload = [
              ...payload,
              {
                id: data?.pages[i][j]?.id,
                name:
                  data?.pages[i][j]?.name?.length > 13
                    ? `${data?.pages[i][j]?.name?.slice(0, 13)}...`
                    : data?.pages[i][j]?.name,
                registration_time: new Date(
                  data?.pages[i][j]?.reg_time
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                address: !data?.pages[i][j]?.address?.length
                  ? "N.A"
                  : data?.pages[i][j]?.address?.length > 19
                  ? `${data?.pages[i][j]?.address?.slice(0, 19)}...`
                  : data?.pages[i][j]?.address,
                initial: data?.pages[i][j]?.name.slice(0, 1).toUpperCase(),
                photo:
                  data.pages[i][j].photo === null ? "" : data.pages[i][j].photo,
                mobile:
                  data.pages[i][j].mobile === null
                    ? "No phone number"
                    : data.pages[i][j].mobile,
              },
            ];
          }
        }
      }
      dispatch({
        type: OutletListActionEnum.SetOutletList,
        payload: payload,
      });
    }
  }, [query.data]);

  return query;
};
