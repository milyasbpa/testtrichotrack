import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetQuestionnaireRequestInterface,
  GetQuestionnaireResponseInterface,
} from "src/core/models/api/configuration";
import { fetchGetQuestionnaire } from "src/core/services/configuration";
import { useMemo } from "react";
import { CustomerRegistrationReactQueryKey } from "../keys";
import { useParams } from "react-router-dom";

export const useRegistrationGetQuestionnaire = () => {
  const { locale } = useParams();
  const payload: GetQuestionnaireRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const query = useQuery<GetQuestionnaireResponseInterface, AxiosError>({
    queryKey: CustomerRegistrationReactQueryKey.GetQuestionnaire(payload),
    queryFn: () => {
      return fetchGetQuestionnaire(payload);
    },
  });

  return query;
};

export const useRegistrationGetEnglishQuestionnaire = () => {
  const payload: GetQuestionnaireRequestInterface = useMemo(() => {
    return {
      language: "English",
    };
  }, []);

  const query = useQuery<GetQuestionnaireResponseInterface, AxiosError>({
    queryKey: CustomerRegistrationReactQueryKey.GetEnglishQuestionnaire(),
    queryFn: () => {
      return fetchGetQuestionnaire(payload);
    },
  });

  return query;
};
