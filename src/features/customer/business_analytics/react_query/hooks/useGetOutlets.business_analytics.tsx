import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CustomerBusinessAnalyticsReactQueryKey } from "../keys";

import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";
import { CustomerBusinessAnalyticsContext } from "../../contexts/CustomerBusinessAnalytics.context";
import { CustomerBusinessAnalyticsActionEnum } from "../../contexts/CustomerBusinessAnalytics.types";

export const useCustomerBusinessAnalyticsGetOutlets = () => {
  const { dispatch } = useContext(CustomerBusinessAnalyticsContext);
  let skip = 0;
  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: CustomerBusinessAnalyticsReactQueryKey.GetOutlets(),
    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;
      const LIMIT = 50;
      let newPayload: GetOutletsRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
        sort_by: "name",
        ascending: true,
      };

      return fetchGetOutlets(newPayload);
    },
    initialPageParam: 0,
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * 6;
      return pageParams.length * 6;
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      if (!!data.pages.length) {
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
          type: CustomerBusinessAnalyticsActionEnum.SetOutletsData,
          payload: [
            {
              id: "All Outlets",
              name: "All Outlets",
            },
            ...payload,
          ],
        });
      }
    }
  }, [query.data]);

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: CustomerBusinessAnalyticsActionEnum.SetOutletsData,
          payload: [],
        });
      }
    }
  }, [query.error]);

  return query;
};
