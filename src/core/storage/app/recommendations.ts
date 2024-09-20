import { RecommendationsStorageInterface } from "src/core/models/storage/app";
import localforage from "localforage";

export const setRecommendations = (data: RecommendationsStorageInterface) => {
  return localforage
    .setItem("Recommendations", data)
    .then((res: RecommendationsStorageInterface) => res);
};

export const getRecommendations = () => {
  return localforage
    .getItem("Recommendations")
    .then((res: any | RecommendationsStorageInterface) => res);
};

export const removeRecommendations = () => {
  return localforage
    .removeItem("Recommendations")
    .then((res: any | RecommendationsStorageInterface) => res);
};
