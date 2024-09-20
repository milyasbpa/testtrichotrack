import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetDefaultRoot = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.API_PROXY_URL}${ENVIRONMENT.REWRITE_API_URL}/`
      : `${ENVIRONMENT.API_URL}/`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
