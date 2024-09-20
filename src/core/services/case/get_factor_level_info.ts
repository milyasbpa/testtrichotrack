import axios from "axios";
import Cookies from "universal-cookie";
import { GetFactorLevelInfoRequestInterface } from "src/core/models/api/cases";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetFactorLevelInfo = async (
  payload?: GetFactorLevelInfoRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/diagnosis/factor/level-info`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/diagnosis/factor/level-info`;

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
