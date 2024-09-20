import { CompulsoryScanStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setCompulsoryScan = (data: CompulsoryScanStorageInterface) => {
  return localforage
    .setItem("CompulsoryScan", data)
    .then((res: CompulsoryScanStorageInterface) => res);
};

export const getCompulsoryScan = () => {
  return localforage
    .getItem("CompulsoryScan")
    .then((res: any | CompulsoryScanStorageInterface) => res);
};

export const removeCompulsoryScan = () => {
  return localforage
    .removeItem("CompulsoryScan")
    .then((res: any | CompulsoryScanStorageInterface) => res);
};
