import axios from "axios";
import Cookies from "universal-cookie";
import { GetRaceStatisticsRequestInterface } from "src/core/models/api/dashboard";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetRaceStatistics = async (
  params?: GetRaceStatisticsRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/customers/race-stats`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/customers/race-stats`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    })
    .then((res) => {
      return res.data;
    });
};
