import localforage from "localforage";
import { DeviceStorageInterface } from "src/core/models/storage/app";

export const setDevice = (data: DeviceStorageInterface) => {
  return localforage
    .setItem("Device", data)
    .then((res: DeviceStorageInterface) => res);
};

export const getDevice = () => {
  return localforage
    .getItem("Device")
    .then((res: any | DeviceStorageInterface) => res);
};

export const removeDevice = () => {
  return localforage
    .removeItem("Device")
    .then((res: any | DeviceStorageInterface) => res);
};
