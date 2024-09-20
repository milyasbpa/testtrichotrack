import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { fetchGetQuestionnaire } from "src/core/services/configuration";
import { useMemo } from "react";
import { CustomerQuestionnaireReactQueryKey } from "../keys";
import { useParams } from "react-router-dom";

export const useCustomerQuestionnaireGetQuestionnaire = () => {
  const { locale } = useParams();
  const payload: GetQuestionnaireRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const query = useQuery<GetQuestionnaireResponseInterface, AxiosError>({
    queryKey: CustomerQuestionnaireReactQueryKey.GetQuestionnaire(payload),
    queryFn: () => {
      return fetchGetQuestionnaire(payload);
    },
  });

  return query;
};

export const useCustomerQuestionnaireGetEnglishQuestionnaire = () => {
  const payload: GetQuestionnaireRequestInterface = useMemo(() => {
    return {
      language: "English",
    };
  }, []);

  const query = useQuery<GetQuestionnaireResponseInterface, AxiosError>({
    queryKey: CustomerQuestionnaireReactQueryKey.GetEnglishQuestionnaire(),
    queryFn: () => {
      return fetchGetQuestionnaire(payload);
    },
    retry: 0,
  });

  return query;
};
