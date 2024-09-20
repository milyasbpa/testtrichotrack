import { useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { setScanComparisonItems } from "src/core/storage/app";
import { ScanComparisonStorageInterface } from "src/core/models/storage/app";
import { CustomerRecordContext } from "../../context";
import { CustomerRecordReactQueryKey } from "../keys";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const useCasesSetScanComparisonItems = () => {
  const { locale } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state } = useContext(CustomerRecordContext);

  const mutation = useMutation({
    mutationKey: CustomerRecordReactQueryKey.SetScanComparisonItems(),
    mutationFn: () => {
      const payload: ScanComparisonStorageInterface[] = state.comparison.data;
      return setScanComparisonItems(payload);
    },
    onSuccess(data) {
      if (data !== null) {
        const paramsObj = Object.fromEntries(searchParams.entries());
        const urlSearchParams = new URLSearchParams(paramsObj);

        navigate(
          `${PrivateRouteURL.routeToCustomerComparisonURL({
            locale,
          })}?${urlSearchParams.toString()}`
        );
      }
    },
  });

  return mutation;
};
