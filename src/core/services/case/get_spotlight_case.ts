import axios from "axios";
import Cookies from "universal-cookie";
import { GetSpotlightCaseRequestInterface } from "src/core/models/api/cases";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetSpotlightCase = async (
  data: GetSpotlightCaseRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${data.case_id}/scans/spotlight`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${data.case_id}/scans/spotlight`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

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
