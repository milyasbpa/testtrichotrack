import { ScanComparisonStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setScanComparisonItems = (
  data: ScanComparisonStorageInterface[]
) => {
  return localforage
    .setItem("ScanComparisonItems", data)
    .then((res: ScanComparisonStorageInterface[]) => res);
};

export const getScanComparisonItems = () => {
  return localforage
    .getItem("ScanComparisonItems")
    .then((res: any | ScanComparisonStorageInterface[]) => res);
};

export const removeScanComparisonItems = () => {
  return localforage
    .removeItem("ScanComparisonItems")
    .then((res: any | ScanComparisonStorageInterface[]) => res);
};
