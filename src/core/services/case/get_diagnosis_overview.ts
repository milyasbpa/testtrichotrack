import axios from "axios";
import Cookies from "universal-cookie";
import { GetDiagnosisOverviewRequestInterface } from "src/core/models/api/cases";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetDiagnosisOverview = async (
  payload?: GetDiagnosisOverviewRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${payload?.path.case_id}/diagnosis-overview`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${payload?.path.case_id}/diagnosis-overview`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload?.params,
    })
    .then((res) => {
      return res.data;
    });
};
