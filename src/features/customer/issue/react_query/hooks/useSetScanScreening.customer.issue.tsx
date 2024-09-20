import { useMutation } from "@tanstack/react-query";
import { ScanScreeningStorageInterface } from "src/core/models/storage/app";
import { setScanScreening } from "src/core/storage/app";
import { CustomerIssueReactQueryKey } from "../keys";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useCustomerIssueSetScanScreening = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: CustomerIssueReactQueryKey.SetScanScreening(),
    mutationFn: (payload: ScanScreeningStorageInterface) => {
      return setScanScreening(payload);
    },
    onSuccess() {
      navigate(PrivateRouteURL.routeToCustomerScreeningURL({ locale: locale }));
    },
  });

  return mutation;
};
