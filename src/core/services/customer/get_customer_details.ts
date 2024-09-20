import axios from "axios";
import Cookies from "universal-cookie";
import { GetCustomerDetailRequestInterface } from "src/core/models/api/customer";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetCustomerDetail = async (
  data: GetCustomerDetailRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.customer_id}/details`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.customer_id}/details`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
