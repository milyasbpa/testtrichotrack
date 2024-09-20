import { OutletIDStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setOutletID = (data: OutletIDStorageInterface) => {
  return localforage
    .setItem("OutletID", data)
    .then((res: OutletIDStorageInterface) => res);
};

export const getOutletID = () => {
  return localforage
    .getItem("OutletID")
    .then((res: any | OutletIDStorageInterface) => res);
};

export const removeOutletID = () => {
  return localforage
    .removeItem("OutletID")
    .then((res: any | OutletIDStorageInterface) => res);
};
