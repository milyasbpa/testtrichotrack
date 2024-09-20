import axios from "axios";
import Cookies from "universal-cookie";
import { GetDiagnosisDetailsRequestInterface } from "src/core/models/api/cases";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetDiagnosisDetails = async (
  payload?: GetDiagnosisDetailsRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${
          ENVIRONMENT.VISION_API_VERSION
        }/cases/${payload?.path.case_id ?? 0}/diagnosis/details`
      : `${ENVIRONMENT.API_URL}/scalp/v${
          ENVIRONMENT.VISION_API_VERSION
        }/cases/${payload?.path.case_id ?? 0}/diagnosis/details`;

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
