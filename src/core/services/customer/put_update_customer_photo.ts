import axios from "axios";
import Cookies from "universal-cookie";
import { PutUpdateCustomerPhotoRequestInterface } from "src/core/models/api/customer";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutUpdateCustomerPhoto = (
  data: PutUpdateCustomerPhotoRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.params.customer_id}/photo`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/customers/${data.params.customer_id}/photo`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return axios
    .put(url, data.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
