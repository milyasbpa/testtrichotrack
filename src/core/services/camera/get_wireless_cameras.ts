import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetWirelessCameras = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DRIVER_API_URL}/camera/wireless`
      : `${ENVIRONMENT.DRIVER_API_URL}/camera/wireless`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
