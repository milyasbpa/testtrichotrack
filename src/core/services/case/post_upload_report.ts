import axios from "axios";
import Cookies from "universal-cookie";
import { PostUploadReportRequestInterface } from "src/core/models/api/cases";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostUploadReport = async (
  data: PostUploadReportRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${data.case_id}/report`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cases/${data.case_id}/report`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

  return await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
