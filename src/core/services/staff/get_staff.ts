import Cookies from "universal-cookie";
import { GetStaffRequestInterface } from "src/core/models/api/staff";
import { ENVIRONMENT } from "src/core/constants";
import axios from "axios";

export const fetchGetStaff = async (data: GetStaffRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.staff_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.staff_id}`;
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
