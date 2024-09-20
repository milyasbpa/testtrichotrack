import { useContext, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { CompanyLogoReactQueryKey } from "../keys";
import { fetchPutCompanyLogo } from "src/core/services/configuration";
import {
  PutCompanyLogoRequestInterface,
  PutCompanyLogoResponseInterface,
} from "src/core/models/api/configuration";
import { CompanyLogoContext, CompanyLogoActionEnum } from "../../contexts";
import { AppReactQueryKey } from "src/core/modules/app/react_query/keys";

export const useCompanyLogoPutCompanyLogo = () => {
  const { state, dispatch } = useContext(CompanyLogoContext);

  const queryClient = useQueryClient();
  const payload: PutCompanyLogoRequestInterface = useMemo(() => {
    return {
      logo: state.uploader.image.replace("data:image/png;base64,", ""),
    };
  }, [state.uploader.image]);
  const query = useMutation<PutCompanyLogoResponseInterface, AxiosError>({
    mutationKey: CompanyLogoReactQueryKey.PutCompanyLogo(),
    mutationFn: () => {
      return fetchPutCompanyLogo(payload);
    },
    retry: 0,

    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: AppReactQueryKey.GetCompanyLogo(),
        });
        dispatch({
          type: CompanyLogoActionEnum.SetModalData,
          payload: {
            open: true,
          },
        });
      }
    },
  });

  return query;
};
