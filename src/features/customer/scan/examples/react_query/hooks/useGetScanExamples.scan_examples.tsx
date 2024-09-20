import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetScanExamples } from "src/core/services/configuration";
import {
  GetScanExamplesRequestInterface,
  GetScanExamplesResponseInterface,
} from "src/core/models/api/configuration";
import { ScanExamplesReactQueryKey } from "../keys/keys";
import { useParams } from "react-router-dom";

export const useScanExamplesGetScanExamples = () => {
  const { locale } = useParams();
  const payload: GetScanExamplesRequestInterface = useMemo(() => {
    return {
      language: locale === "zh" ? "Chinese" : "English",
    };
  }, [locale]);

  const query = useQuery<GetScanExamplesResponseInterface[], AxiosError>({
    queryKey: ScanExamplesReactQueryKey.GetScanExamples(payload),
    queryFn: () => {
      return fetchGetScanExamples(payload);
    },
    retry: 0,
  });

  return query;
};
