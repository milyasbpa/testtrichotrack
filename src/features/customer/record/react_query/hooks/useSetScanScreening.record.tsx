import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ScanScreeningStorageInterface } from "src/core/models/storage/app";
import { setScanScreening } from "src/core/storage/app";
import { CustomerRecordReactQueryKey } from "../keys";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useCasesSetScanScreening = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mutation = useMutation({
    mutationKey: CustomerRecordReactQueryKey.SetScanScreening(),
    mutationFn: (payload: ScanScreeningStorageInterface) => {
      return setScanScreening(payload);
    },
    onSuccess(data) {
      if (data !== null) {
        const paramsObj = Object.fromEntries(searchParams.entries());
        const urlSearchParams = new URLSearchParams(paramsObj);

        navigate(
          `${PrivateRouteURL.routeToCustomerScreeningURL({
            locale,
          })}?${urlSearchParams.toString()}`
        );
      }
    },
  });

  return mutation;
};
