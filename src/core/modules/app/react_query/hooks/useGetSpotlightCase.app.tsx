import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGetSpotlightCase } from "src/core/services/case";
import {
  GetRoutineCaseRequestInterface,
  GetSpotlightCaseResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { AppActionEnum, AppContext } from "../../context";
import { AppReactQueryKey } from "../keys";
import { ENVIRONMENT } from "src/core/constants";

export const useAppGetSpotlightCase = () => {
  const { state, dispatch } = useContext(AppContext);

  const caseId = parseInt(state.cases.data.selected?.id ?? "-1");

  const payload: GetRoutineCaseRequestInterface = {
    case_id: caseId,
  };

  const query = useQuery<GetSpotlightCaseResponseInterface[], AxiosError>({
    queryKey: AppReactQueryKey.GetSpotlightCase(payload),

    queryFn: () => {
      return fetchGetSpotlightCase(payload);
    },
    enabled: !!state.cases.data.data.length,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: AppActionEnum.SetSpotlightRecordCasesData,
        payload: data.map((item) => {
          return {
            ...item,
            image:
              ENVIRONMENT.ENVIRONMENT === "localhost"
                ? item.image.replace(
                    ENVIRONMENT.CUSTOMER_RECORD_IMAGE_SERVER_URL,
                    `${ENVIRONMENT.APP_URL}/scan-image`
                  )
                : item.image,
          };
        }),
      });
    }
  }, [query.data, query.isFetching]);

  useEffect(() => {
    if (!!query.error) {
      const err = query.error;
      if (err.response?.status === 404) {
        dispatch({
          type: AppActionEnum.SetSpotlightRecordCasesData,
          payload: [],
        });
      }
    }
  }, [query.error]);

  return query;
};
