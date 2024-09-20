import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetScanExamplesGlobal } from "src/core/services/configuration";
import {
  GetScanExamplesGlobalRequestInterface,
  GetScanExamplesGlobalResponseInterface,
} from "src/core/models/api/configuration";
import { GlobalScanExamplesReactQueryKey } from "../keys/keys";
import { useParams } from "react-router-dom";

export const useGlobalScanExamplesGetScanExamples = () => {
  const { locale } = useParams();
  const payload: GetScanExamplesGlobalRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const query = useQuery<GetScanExamplesGlobalResponseInterface[], AxiosError>({
    queryKey: GlobalScanExamplesReactQueryKey.GetScanExamplesGlobal(payload),
    queryFn: () => {
      return fetchGetScanExamplesGlobal(payload);
    },
  });

  return query;
};
