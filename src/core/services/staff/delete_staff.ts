import axios from "axios";
import Cookies from "universal-cookie";
import { DeleteStaffRequestInterface } from "src/core/models/api/staff";
import { ENVIRONMENT } from "src/core/constants";

export const fetchDeleteStaff = async (data: DeleteStaffRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.staff_id}`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/staffs/${data.staff_id}`;
  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
