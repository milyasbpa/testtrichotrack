import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";
import Cookies from "universal-cookie";

export const fetchGetCameras = async () => {
  const url =
    process.env.REACT_APP_ALVISUAL_ENVIRONMENT === "localhost"
      ? `${process.env.REACT_APP_API_PROXY_URL}${process.env.REACT_APP_REWRITE_API_URL}/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cameras/`
      : `${process.env.REACT_APP_API_URL}/apps/scalp/v${ENVIRONMENT.VISION_API_VERSION}/cameras/`;

  const cookie = new Cookies();
  const token = cookie.get("staff-token");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
