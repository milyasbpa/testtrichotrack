import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import {
  PostUploadReportRequestInterface,
  PostUploadReportResponseInterface,
} from "src/core/models/api/cases";
import { fetchPostUploadReport } from "src/core/services/case";
import { AxiosError } from "axios";
import { AppActionEnum, AppContext } from "../../context";
import { AppReactQueryKey } from "../keys";

export const useAppPostUploadReport = () => {
  const { state, dispatch } = useContext(AppContext);

  const mutation = useMutation<
    PostUploadReportResponseInterface,
    AxiosError,
    string
  >({
    mutationKey: AppReactQueryKey.PostUploadReport(),
    mutationFn: (image: string) => {
      const payload: PostUploadReportRequestInterface = {
        case_id: parseInt(state.cases.data.selected?.id ?? "0"),
        report: image.replace("data:image/jpeg;base64,", ""),
      };
      return fetchPostUploadReport(payload);
    },
    retry: 1,

    onSuccess(data) {
      if (data !== null) {
        dispatch({
          type: AppActionEnum.SetReportData,
          payload: {
            ...state.report,
            feature: {
              ...state.report.feature,
              step: "qris",
              data: {
                ...state.report.feature.data,
                image_url: data.detail,
              },
            },
          },
        });
      }
    },
  });

  return mutation;
};
