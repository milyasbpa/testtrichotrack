import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

import { PostLoginByCustomerIDRequestInterface } from "src/core/models/api/login";
import Cookies from "universal-cookie";

export const fetchPostLoginByCustomerID = async (
  data: PostLoginByCustomerIDRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/customers/${data.customer_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/customers/${data.customer_id}`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
