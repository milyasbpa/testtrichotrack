import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomerComparisonReactQueryKey } from "../keys";
import { CustomerComparisonContext } from "../../context/Comparison.customer.context";
import { fetchGetScreenings } from "src/core/services/case";
import {
  GetScreeningsRequestInterface,
  GetScreeningsResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { CustomerComparisonActionEnum } from "../../context";

export const useCustomerComparisonGetScreenings = () => {
  const { locale } = useParams();

  const { state, dispatch } = useContext(CustomerComparisonContext);

  const payload: GetScreeningsRequestInterface = useMemo(() => {
    return {
      params: {
        language: locale === "zh" ? "Chinese" : "English",
        scan_ids: state.cases.data.map((item) => item.id).toString(),
      },
    };
  }, [locale, state.cases.data]);

  const query = useQuery<GetScreeningsResponseInterface[], AxiosError>({
    queryKey: CustomerComparisonReactQueryKey.GetScreening(payload),
    queryFn: () => {
      return fetchGetScreenings(payload);
    },
    enabled: !!state.cases.data.length,
    retry: 0,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerComparisonActionEnum.SetCasesData,
        payload: {
          ...state.cases,
          data: state.cases.data.map((item) => {
            const selectedData = data.find(
              (screening) => screening?.scan_id === item.id
            );
            return {
              id: item.id,
              image_url: item.image_url,
              region: item.region,
              svc_time: item.svc_time,
              screening: !selectedData
                ? null
                : (Object.keys(selectedData)
                    .filter((key) => typeof selectedData[key] !== "number") // Filtering out 'age' and 'email'
                    .reduce((acc, key) => {
                      acc[key] = selectedData[key as keyof typeof selectedData];
                      return acc;
                    }, {} as Partial<typeof selectedData>) as {
                    [key: string]: {
                      [key: string]: {
                        name: string;
                        unit: string;
                        description: string;
                        mapping_figure: string;
                        value: number | { [key: string]: number };
                      };
                    };
                  }),
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
