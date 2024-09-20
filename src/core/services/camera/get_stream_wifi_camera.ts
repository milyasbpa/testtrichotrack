import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetStreamWifiCamera = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DRIVER_API_URL}/camera/stream-wireless`
      : `${ENVIRONMENT.DRIVER_API_URL}/camera/stream-wireless`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
