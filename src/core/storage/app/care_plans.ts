import { CarePlansStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setCarePlans = (data: CarePlansStorageInterface) => {
  return localforage
    .setItem("CarePlans", data)
    .then((res: CarePlansStorageInterface) => res);
};

export const getCarePlans = () => {
  return localforage
    .getItem("CarePlans")
    .then((res: any | CarePlansStorageInterface) => res);
};

export const removeCarePlans = () => {
  return localforage
    .removeItem("CarePlans")
    .then((res: any | CarePlansStorageInterface) => res);
};
