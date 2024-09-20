import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetCarePlanByIdRequestInterface,
  GetCarePlanByIdSuccessResponseInterface,
} from "src/core/models/api/recommendations";
import { AxiosError } from "axios";
import { fetchGetCareplanById } from "src/core/services/recommendation";
import { useParams } from "react-router-dom";
import {
  CustomerCarePlansContext,
  CustomerCarePlansActionEnum,
} from "../../context";
import { CustomerCarePlansReactQueryKey } from "../keys";

export const useCarePlansGetCarePlanById = () => {
  const { state, dispatch } = useContext(CustomerCarePlansContext);
  const { locale, care_plans_id, diagnosis_id } = useParams();

  const diagnosisOverview = state.diagnosis.overview.data;
  const payload: GetCarePlanByIdRequestInterface = useMemo(() => {
    if (!diagnosisOverview || !diagnosis_id) {
      return {
        careplan_id: -1,
        rating: -1,
        language: locale === "zh" ? "Chinese" : "English",
      };
    }
    const rating = diagnosisOverview.rating ?? -1;
    return {
      careplan_id: parseInt(care_plans_id ?? "-1"),
      rating: rating,
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale, diagnosis_id, diagnosisOverview]);

  const query = useQuery<GetCarePlanByIdSuccessResponseInterface, AxiosError>({
    queryKey: CustomerCarePlansReactQueryKey.GetCarePlanById(payload),
    queryFn: () => {
      return fetchGetCareplanById(payload);
    },
    enabled: !!diagnosisOverview && !!diagnosis_id && !!care_plans_id,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerCarePlansActionEnum.SetCarePlansValue,
        payload: {
          ...state.careplans,
          data: data,
        },
      });

      // dispatch({
      //   type: CustomerCarePlansActionEnum.SetScheduleValue,
      //   payload: {
      //     ...state.schedule,
      //     times: data.schedule,
      //     treatment: data.name,
      //   },
      // });
    }
  }, [query.data, query.isFetching]);

  return query;
};
