import axios from "axios";
import { ENVIRONMENT } from "src/core/constants";

export const fetchGetSnapshotWifiCamera = async () => {
  const url =
    ENVIRONMENT.ENVIRONMENT === "localhost"
      ? `${ENVIRONMENT.DRIVER_API_URL}/camera/snapshot-wireless`
      : `${ENVIRONMENT.DRIVER_API_URL}/camera/snapshot-wireless`;

  return await axios.get(url).then((res) => {
    return res.data;
  });
};
