import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetOutlets200SuccessResponseInterface,
  GetOutletsRequestInterface,
} from "src/core/models/api/outlet";
import { fetchGetOutlets } from "src/core/services/outlet";
import { AddOutletReactQueryKey } from "../keys";

export const useAddOutletGetOutlets = () => {
  const LIMIT = 50;

  const query = useInfiniteQuery<
    GetOutlets200SuccessResponseInterface[],
    AxiosError
  >({
    queryKey: AddOutletReactQueryKey.GetOutlets(),
    queryFn: ({ pageParam = 0 }) => {
      let newPayload: GetOutletsRequestInterface = {
        skip: pageParam as number,
        limit: LIMIT,
        sort_by: "name",
        ascending: true,
      };

      return fetchGetOutlets(newPayload);
    },
    retry: 0,
    initialPageParam: 0,
    getNextPageParam: (_, pageParams) => {
      return pageParams.length * LIMIT;
    },
  });

  return query;
};
