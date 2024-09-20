import { ClientCameraStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setClientCamera = (data: ClientCameraStorageInterface) => {
  return localforage
    .setItem("ClientCamera", data)
    .then((res: ClientCameraStorageInterface) => res);
};

export const getClientCamera = () => {
  return localforage
    .getItem("ClientCamera")
    .then((res: any | ClientCameraStorageInterface) => res);
};

export const removeClientCamera = () => {
  return localforage
    .removeItem("ClientCamera")
    .then((res: any | ClientCameraStorageInterface) => res);
};
