import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompulsoryScanReactQueryKey } from "../keys/keys";
import { getGlobalScan } from "src/core/storage/app";
import { GlobalScanStorageInterface } from "src/core/models/storage/app";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CompulsoryScanForm } from "../../react_hook_form/data";

export const useCompulsoryScanGetGlobalScan = () => {
  const { setValue } = useFormContext<CompulsoryScanForm>();
  const query = useQuery<GlobalScanStorageInterface, AxiosError>({
    queryKey: CompulsoryScanReactQueryKey.GetGlobalScan(),
    queryFn: () => {
      return getGlobalScan();
    },
  });

  useEffect(() => {
    if (!!query.data) {
      const data = !query.data.data.length
        ? [
            {
              order: 1,
              id: 4,
              icon: "/icons/face_area/face-area-4.icon.svg",
              image: "",
              region: "Middle Crown",
            },
            {
              order: 2,
              id: 3,
              icon: "/icons/face_area/face-area-3.icon.svg",
              image: "",
              region: "Left Parietal",
            },
            {
              order: 3,
              id: 2,
              icon: "/icons/face_area/face-area-2.icon.svg",
              image: "",
              region: "Right Parietal",
            },
            {
              order: 4,
              id: 1,
              icon: "/icons/face_area/face-area-1.icon.svg",
              image: "",
              region: "Middle Frontal",
            },
          ]
        : [
            {
              order: 3,
              id: 4,
              icon: "/icons/face_area/face-area-4.icon.svg",
              image: "",
              region: "Middle Crown",
            },
            {
              order: 4,
              id: 3,
              icon: "/icons/face_area/face-area-3.icon.svg",
              image: "",
              region: "Left Parietal",
            },
            {
              order: 5,
              id: 2,
              icon: "/icons/face_area/face-area-2.icon.svg",
              image: "",
              region: "Right Parietal",
            },
            {
              order: 6,
              id: 1,
              icon: "/icons/face_area/face-area-1.icon.svg",
              image: "",
              region: "Middle Frontal",
            },
          ];
      setValue("data", data);
    }
  }, [query.data]);

  return query;
};
