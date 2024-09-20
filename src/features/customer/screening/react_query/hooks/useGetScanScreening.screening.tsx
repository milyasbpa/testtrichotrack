import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGetScanScreening } from "src/core/services/case";
import {
  GetScanScreeningRequestInterface,
  GetScanScreeningResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import {
  CustomerScreeningActionEnum,
  CustomerScreeningContext,
} from "../../context";
import { useParams } from "react-router-dom";
import { CustomerScreeningReactQueryKey } from "../keys";

export const useCustomerScreeningGetScanScreening = () => {
  const { state, dispatch } = useContext(CustomerScreeningContext);
  const { locale } = useParams();

  const payload: GetScanScreeningRequestInterface = useMemo(() => {
    return {
      path: {
        scan_id: state.scan.id.toString(),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
  }, [locale, state.scan.id]);

  const query = useQuery<GetScanScreeningResponseInterface, AxiosError>({
    queryKey: CustomerScreeningReactQueryKey.GetScanScreening(payload),
    queryFn: () => {
      return fetchGetScanScreening(payload);
    },
    enabled: state.scan.id !== -1,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerScreeningActionEnum.SetAnnotationsValue,
        payload: {
          ...state.annotations,
          follicle: {
            ...state.annotations.follicle,
            data: data.follicle_objects,
          },
          hair: {
            ...state.annotations.hair,
            data: data.hair_objects,
          },
          pimple: {
            ...state.annotations.pimple,
            data: data.pimple_objects,
          },
          dandruff: {
            ...state.annotations.dandruff,
            data: data.dandruff_objects,
          },
        },
      });

      dispatch({
        type: CustomerScreeningActionEnum.SetScreeningData,
        payload: {
          ...state.screening,
          data: Object.fromEntries(
            Object.entries(data).filter(([key]) => !key.includes("objects"))
          ),
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
