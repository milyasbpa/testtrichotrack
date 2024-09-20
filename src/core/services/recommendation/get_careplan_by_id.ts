import axios from "axios";
import Cookies from "universal-cookie";
import { GetCarePlanByIdRequestInterface } from "src/core/models/api/recommendations";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetCareplanById = async (
  data: GetCarePlanByIdRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/careplans/${data.careplan_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/recommendations/careplans/${data.careplan_id}`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    })
    .then((res) => {
      return res.data;
    });
};
