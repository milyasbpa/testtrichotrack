import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { SpotlightScanReactQueryKey } from "../keys/keys";

export const useSpotlightScanGetButtonPressStatus = () => {
  const query = useQuery<GetButtonPressStatusResponseInterface, AxiosError>({
    queryKey: SpotlightScanReactQueryKey.GetButtonPressStatus(),
    queryFn: () => {
      return fetchGetButtonPressStatus();
    },
    retry: 0,
    refetchInterval: 1000,
  });

  return query;
};
