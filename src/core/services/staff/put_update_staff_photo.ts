import axios from "axios";
import Cookies from "universal-cookie";
import { PutUpdateStaffPhotoRequestInterface } from "src/core/models/api/staff";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutUpdateStaffPhoto = (
  data: PutUpdateStaffPhotoRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.params.staff_id}/photo`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.params.staff_id}/photo`;

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
