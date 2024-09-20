import { SpotlightScanStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setSpotlightScan = (data: SpotlightScanStorageInterface) => {
  return localforage
    .setItem("SpotlightScan", data)
    .then((res: SpotlightScanStorageInterface) => res);
};

export const getSpotlightScan = () => {
  return localforage
    .getItem("SpotlightScan")
    .then((res: any | SpotlightScanStorageInterface) => res);
};

export const removeSpotlightScan = () => {
  return localforage
    .removeItem("SpotlightScan")
    .then((res: any | SpotlightScanStorageInterface) => res);
};
