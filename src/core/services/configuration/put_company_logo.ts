import axios from "axios";
import Cookies from "universal-cookie";
import { PutCompanyLogoRequestInterface } from "src/core/models/api/configuration";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPutCompanyLogo = async (
  payload: PutCompanyLogoRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/company-logo`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/company-logo`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
