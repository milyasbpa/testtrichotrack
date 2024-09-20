import { CustomerIDStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setCustomerID = (data: CustomerIDStorageInterface) => {
  return localforage
    .setItem("CustomerID", data)
    .then((res: CustomerIDStorageInterface) => res);
};

export const getCustomerID = () => {
  return localforage
    .getItem("CustomerID")
    .then((res: any | CustomerIDStorageInterface) => res);
};

export const removeCustomerID = () => {
  return localforage
    .removeItem("CustomerID")
    .then((res: any | CustomerIDStorageInterface) => res);
};
