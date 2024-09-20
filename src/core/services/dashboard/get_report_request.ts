import axios from "axios";
import Cookies from "universal-cookie";

import { GetReportRequestRequestInterface } from "src/core/models/api/dashboard";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetReportRequest = async (
  payload: GetReportRequestRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/business/report-request`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/dashboard/business/report-request`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    })
    .then((res) => {
      return res.data;
    });
};
