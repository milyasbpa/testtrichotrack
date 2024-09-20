import axios from "axios";
import Cookies from "universal-cookie";
import { GetOutletRequestInterface } from "src/core/models/api/outlet";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetOutlet = async (data: GetOutletRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/${data.outlet_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/${data.outlet_id}`;
  const cookie = new Cookies();
  const token = cookie.get("staff-token");

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
