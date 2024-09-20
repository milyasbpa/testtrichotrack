import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchGetRoutineCase } from "src/core/services/case";
import {
  GetRoutineCaseRequestInterface,
  GetRoutineCaseResponseInterface,
} from "src/core/models/api/cases";
import { AxiosError } from "axios";
import { AppReactQueryKey } from "../keys";
import { AppActionEnum, AppContext } from "../../context";
import { ENVIRONMENT } from "src/core/constants";

export const useAppGetRoutineCase = () => {
  const { state, dispatch } = useContext(AppContext);

  const caseId = parseInt(state.cases.data.selected?.id ?? "-1");

  const payload: GetRoutineCaseRequestInterface = {
    case_id: caseId,
  };

  const query = useQuery<GetRoutineCaseResponseInterface[], AxiosError>({
    queryKey: AppReactQueryKey.GetRoutineCase(payload),
    queryFn: () => {
      return fetchGetRoutineCase(payload);
    },
    enabled: !!state.cases.data.data.length,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: AppActionEnum.SetRoutineRecordCasesData,
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

  return query;
};
