import axios from "axios";
import Cookies from "universal-cookie";

import { GetAgeStatisticsRequestInterface } from "src/core/models/api/dashboard";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetAgeStatistics = async (
  payload: GetAgeStatisticsRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/customers/age-stats`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/customers/age-stats`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    })
    .then((res) => {
      return res.data;
    });
};
