import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGetCustomers } from "src/core/services/customer";
import {
  GetCustomers200SuccessResponseInterface,
  GetCustomersRequestInterface,
} from "src/core/models/api/customer";
import { AxiosError } from "axios";
import { CustomerListActionEnum, CustomerListContext } from "../../contexts";
import { CustomerListReactQueryKey } from "../keys";

export const useUserCustomerListGetCustomers = () => {
  const { state, dispatch } = useContext(CustomerListContext);

  const LIMIT = 6;
  let skip = 0;
  const query = useInfiniteQuery<
    GetCustomers200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: CustomerListReactQueryKey.GetCustomers({
      limit: LIMIT,
      search: state.customers.search.value,
    }),

    queryFn: ({ pageParam = 0 }) => {
      skip = pageParam as number;

      let newPayload: GetCustomersRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
        sort_by: state.customers.sort.by.includes("Name Ascending")
          ? "name"
          : state.customers.sort.by.includes("Name Descending")
          ? "name"
          : state.customers.sort.by.includes("Registration Ascending")
          ? "reg_time"
          : state.customers.sort.by.includes("Registration Descending")
          ? "reg_time"
          : "",
        ascending: state.customers.sort.by.includes("Name Ascending")
          ? true
          : state.customers.sort.by.includes("Name Descending")
          ? false
          : state.customers.sort.by.includes("Registration Ascending")
          ? true
          : state.customers.sort.by.includes("Registration Descending")
          ? false
          : false,
        search: state.customers.search.value,
      };

      return fetchGetCustomers(newPayload);
    },
    retry: 0,
    getNextPageParam: (_, pageParams) => {
      skip = pageParams.length * LIMIT;
      return pageParams.length * LIMIT;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      if (data !== undefined && data?.pages?.length > 0) {
        let payload: {
          id: string;
          name: string;
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
                  id: String(data?.pages[i][j]?.id),
                  name: data?.pages[i][j]?.name,
                  registration_time: new Date(
                    data?.pages[i][j]?.reg_time
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }),
                  initial: data?.pages[i][j]?.name.slice(0, 1).toUpperCase(),
                  photo:
                    data.pages[i][j].photo !== null
                      ? data.pages[i][j].photo
                      : "",
                  mobile: data.pages[i][j].mobile,
                },
              ];
            }
          }
        }

        dispatch({
          type: CustomerListActionEnum.SetCustomerList,
          payload: payload,
        });
      }
    }
  }, [query.data]);

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404 && skip === 0) {
        dispatch({
          type: CustomerListActionEnum.SetCustomerList,
          payload: [],
        });
      }
    }
  }, [query.error]);

  return query;
};
