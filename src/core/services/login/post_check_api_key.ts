import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";
import { PostCheckAPIKeyRequestInterface } from "src/core/models/api/login";

export const fetchPostCheckAPIKey = (data: PostCheckAPIKeyRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/check-apikey`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/check-apikey`;

  const formData = new FormData();
  formData.append("client_secret", data.client_secret);

  return axios
    .post(url, formData)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
