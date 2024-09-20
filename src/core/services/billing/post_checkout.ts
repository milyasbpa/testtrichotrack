import axios from "axios";
import Cookies from "universal-cookie";
import { PostCheckoutRequestInterface } from "src/core/models/api/billings";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostCheckout = (payload: PostCheckoutRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/checkout`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/billings/checkout`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return axios
    .post(url, payload.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
