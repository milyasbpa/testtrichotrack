import axios from "axios";
import Cookies from "universal-cookie";

import { PostSendOTPRequestInterface } from "src/core/models/api/login";
import { ENVIRONMENT } from "src/core/constants";

export const fetchPostSendOTP = async (data: PostSendOTPRequestInterface) => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/send-otp`
      : `${ENVIRONMENT.API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/login/send-otp`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

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
