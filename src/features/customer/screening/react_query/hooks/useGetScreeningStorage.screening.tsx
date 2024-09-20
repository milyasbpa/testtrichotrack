import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScanScreeningStorageInterface } from "src/core/models/storage/app";
import { getScanScreening } from "src/core/storage/app";
import { CustomerScreeningReactQueryKey } from "../keys";
import {
  CustomerScreeningActionEnum,
  CustomerScreeningContext,
} from "../../context";

export const useDetailScreeningGetScreeningStorage = () => {
  const { dispatch } = useContext(CustomerScreeningContext);

  const query = useQuery<ScanScreeningStorageInterface | null>({
    queryKey: CustomerScreeningReactQueryKey.GetScreeningStorage(),
    queryFn: () => {
      return getScanScreening();
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: CustomerScreeningActionEnum.SetScanValue,
        payload: {
          region: data.region,
          image: data.image,
          svc_time: data.svc_time,
          id: data.id,
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
