import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

import { PostAccessTokenRequestInterface } from "src/core/models/api/login";

export const fetchPostAccessToken = async (
  data: PostAccessTokenRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/access-token`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/access-token`;

  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("client_secret", data.client_secret);

  return await axios
    .post(url, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
