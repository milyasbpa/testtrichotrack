import axios from "axios";
import Cookies from "universal-cookie";
import { GetScanExamplesRequestInterface } from "src/core/models/api/configuration";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetScanExamples = async (
  payload?: GetScanExamplesRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/scan-examples/local`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/scan-examples/local`;

  const cookie = new Cookies();
  const token = cookie.get("customer-token");

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
