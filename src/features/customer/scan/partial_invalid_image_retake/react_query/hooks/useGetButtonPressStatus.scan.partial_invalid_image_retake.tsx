import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { PartialScanImageInvalidRetakeReactQueryKey } from "../keys/keys";

export const usePartialImageInvalidRetakeGetButtonPressStatus = () => {
  const query = useQuery<GetButtonPressStatusResponseInterface, AxiosError>({
    queryKey: PartialScanImageInvalidRetakeReactQueryKey.GetButtonPressStatus(),
    queryFn: () => {
      return fetchGetButtonPressStatus();
    },
    retry: 0,
    refetchInterval: 1000,
  });

  return query;
};
