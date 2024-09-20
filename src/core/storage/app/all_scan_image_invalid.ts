import { AllScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setAllScanImageInvalid = (
  data: AllScanImageInvalidStorageInterface
) => {
  return localforage
    .setItem("AllScanImageInvalid", data)
    .then((res: AllScanImageInvalidStorageInterface) => res);
};

export const getAllScanImageInvalid = () => {
  return localforage
    .getItem("AllScanImageInvalid")
    .then((res: any | AllScanImageInvalidStorageInterface) => res);
};

export const removeAllScanImageInvalid = () => {
  return localforage
    .removeItem("AllScanImageInvalid")
    .then((res: any | AllScanImageInvalidStorageInterface) => res);
};
