import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";
import { GetCompanyLogoRequestInterface } from "src/core/models/api/configuration";

export const fetchGetCompanyLogo = async (
  payload: GetCompanyLogoRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/company-logo`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/configuration/company-logo`;

  return await axios
    .get(url, {
      headers: {
        "api-key": payload.apiKey,
      },
    })
    .then((res) => {
      return res.data;
    });
};
