import { ScanScreeningStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setScanScreening = (data: ScanScreeningStorageInterface) => {
  return localforage
    .setItem("ScanScreening", data)
    .then((res: ScanScreeningStorageInterface) => res);
};

export const getScanScreening = () => {
  return localforage
    .getItem("ScanScreening")
    .then((res: any | ScanScreeningStorageInterface) => res);
};

export const removeScanScreening = () => {
  return localforage
    .removeItem("ScanScreening")
    .then((res: any | ScanScreeningStorageInterface) => res);
};
