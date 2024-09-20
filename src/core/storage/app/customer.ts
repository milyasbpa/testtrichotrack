import { CustomerStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setCustomer = (data: CustomerStorageInterface) => {
  return localforage
    .setItem("Customer", data)
    .then((res: CustomerStorageInterface) => res);
};

export const getCustomer = () => {
  return localforage
    .getItem("Customer")
    .then((res: any | CustomerStorageInterface) => res);
};

export const removeCustomer = () => {
  return localforage
    .removeItem("Customer")
    .then((res: any | CustomerStorageInterface) => res);
};
