import axios from "axios";
import Cookies from "universal-cookie";
import { GetHomeCareByIdRequestInterface } from "src/core/models/api/recommendations";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetHomecareById = async (
  payload?: GetHomeCareByIdRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/homecares/${payload?.path.homecare_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/homecares/${payload?.path.homecare_id}`;

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
