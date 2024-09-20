import { PartialScanImageInvalidStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setPartialScanImageInvalid = (
  data: PartialScanImageInvalidStorageInterface
) => {
  return localforage
    .setItem("PartialScanImageInvalid", data)
    .then((res: PartialScanImageInvalidStorageInterface) => res);
};

export const getPartialScanImageInvalid = () => {
  return localforage
    .getItem("PartialScanImageInvalid")
    .then((res: any | PartialScanImageInvalidStorageInterface) => res);
};

export const removePartialScanImageInvalid = () => {
  return localforage
    .removeItem("PartialScanImageInvalid")
    .then((res: any | PartialScanImageInvalidStorageInterface) => res);
};
