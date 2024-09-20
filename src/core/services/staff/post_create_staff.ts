import axios from "axios";
import Cookies from "universal-cookie";
import { PostCreateStaffRequestInterface } from "src/core/models/api/staff";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostCreateStaff = (data: PostCreateStaffRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/`;

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
