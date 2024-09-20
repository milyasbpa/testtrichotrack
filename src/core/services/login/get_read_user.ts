import axios, { AxiosResponse } from "axios";

import {
  GetReadUser200SuccessResponseInterface,
  GetReadUserRequestInterface,
} from "src/core/models/api/login";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetReadUser = async (
  payload?: GetReadUserRequestInterface
) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/read-user`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/read-user`;

  // NOTES: test session timeout
  // const token = "kaoksdasdjaisda";

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${payload?.token ?? ""}`,
      },
    })
    .then((res: AxiosResponse<GetReadUser200SuccessResponseInterface>) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
