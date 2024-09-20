import axios from "axios";
import Cookies from "universal-cookie";
import { PostCreateOutletRequestInterface } from "src/core/models/api/outlet";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostCreateOutlet = (
  data: PostCreateOutletRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/outlets/`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
