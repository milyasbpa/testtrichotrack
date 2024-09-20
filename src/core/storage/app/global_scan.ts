import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setGlobalScan = (data: GlobalScanStorageInterface) => {
  return localforage
    .setItem("GlobalScan", data)
    .then((res: GlobalScanStorageInterface) => res);
};

export const getGlobalScan = () => {
  return localforage
    .getItem("GlobalScan")
    .then((res: any | GlobalScanStorageInterface) => res);
};

export const removeGlobalScan = () => {
  return localforage
    .removeItem("GlobalScan")
    .then((res: any | GlobalScanStorageInterface) => res);
};
