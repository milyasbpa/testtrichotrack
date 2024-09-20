import axios from "axios";
import Cookies from "universal-cookie";
import { GetRecommendationsMetricRequestInterface } from "src/core/models/api/recommendations";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetRecommendationsMetric = async (
  payload?: GetRecommendationsMetricRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/metric`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/metric`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload?.params,
    })
    .then((res) => {
      return res.data;
    });
};
