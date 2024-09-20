import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchGetButtonPressStatus } from "src/core/services/camera";
import { GetButtonPressStatusResponseInterface } from "src/core/models/api/camera";
import { CompulsoryScanReactQueryKey } from "../keys/keys";

export const useCompulsoryScanGetButtonPressStatus = () => {
  const query = useQuery<GetButtonPressStatusResponseInterface, AxiosError>({
    queryKey: CompulsoryScanReactQueryKey.GetButtonPressStatus(),
    queryFn: () => {
      return fetchGetButtonPressStatus();
    },
    refetchInterval: 500,
  });

  return query;
};
