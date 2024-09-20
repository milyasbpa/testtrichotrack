import axios from "axios";
import Cookies from "universal-cookie";
import { PutUpdateStaffAdministrativeRequestInterface } from "src/core/models/api/staff";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutUpdateStaffAdministrative = (
  data: PutUpdateStaffAdministrativeRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.params.staff_id}/administrative`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.params.staff_id}/administrative`;

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
