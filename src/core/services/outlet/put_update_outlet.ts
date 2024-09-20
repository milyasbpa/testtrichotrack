import axios from "axios";
import Cookies from "universal-cookie";
import { PutUpdateOutletRequestInterface } from "src/core/models/api/outlet";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutUpdateOutlet = (data: PutUpdateOutletRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/${data.params.outlet_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/${data.params.outlet_id}`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return axios
    .put(url, data.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
