import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PaymentHistoryReactQueryKey } from "../keys/keys";
import { fetchGetPaymentRecords } from "src/core/services/billing";
import {
  GetPaymentRecordsRequestInterface,
  GetPaymentRecordsResponseInterface,
} from "src/core/models/api/billings";
import { useContext, useEffect, useMemo } from "react";
import moment from "moment";
import { ClientPaymentHistoryContext } from "../../contexts/ClientPaymentHistory.context";
import { ClientPaymentHistoryActionEnum } from "../../contexts/ClientPaymentHistory.types";

export const usePaymentHistoryGetPaymentRecords = () => {
  const { state, dispatch } = useContext(ClientPaymentHistoryContext);

  const payload: GetPaymentRecordsRequestInterface = useMemo(() => {
    return {
      params: {
        start:
          state.list.filter.period.value.start_date !== null
            ? moment(state.list.filter.period.value.start_date).format(
                "YYYY-MM-DD"
              )
            : "2024-05-01",
        end:
          state.list.filter.period.value.end_date !== null
            ? moment(state.list.filter.period.value.end_date).format(
                "YYYY-MM-DD"
              )
            : moment().format("YYYY-MM-DD"),
      },
    };
  }, [
    state.list.filter.period.value.start_date,
    state.list.filter.period.value.end_date,
  ]);

  const query = useQuery<GetPaymentRecordsResponseInterface[], AxiosError>({
    queryKey: PaymentHistoryReactQueryKey.GetPaymentRecords(payload),
    queryFn: () => {
      return fetchGetPaymentRecords(payload);
    },
    enabled: !state.list.filter.period.error.code.length,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ClientPaymentHistoryActionEnum.SetListData,
        payload: data.map((item) => {
          return {
            id: item.id,
            timestamp: item.payment_time,
            picture: "",
            tier_name: {
              en: item.tier_name.English,
              zh: item.tier_name.Chinese,
            },
            receipt: item.receipt ?? "",
          };
        }),
      });
    }
  }, [query.data, query.isFetching]);

  useEffect(() => {
    if (!!query.isError || !!query.error) {
      if (query.error?.response?.status === 404) {
        dispatch({
          type: ClientPaymentHistoryActionEnum.SetListData,
          payload: [],
        });
      }
    }
  }, [query.error, query.isError]);

  return query;
};
