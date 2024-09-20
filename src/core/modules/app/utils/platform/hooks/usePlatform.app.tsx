import { useEffect, useContext } from "react";
import { AppActionEnum, AppContext } from "../../../context";
import { ENVIRONMENT } from "src/core/constants";

export const useAppPlatform = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (ENVIRONMENT.MOCK_PWA === "true") {
      dispatch({
        type: AppActionEnum.SetPlatformData,
        payload: {
          ...state.platform,
          mode: "pwa",
        },
      });
    } else {
      if (typeof window !== undefined) {
        if (window.matchMedia("(display-mode: standalone)").matches) {
          dispatch({
            type: AppActionEnum.SetPlatformData,
            payload: {
              ...state.platform,
              mode: "pwa",
            },
          });
        } else {
          dispatch({
            type: AppActionEnum.SetPlatformData,
            payload: {
              ...state.platform,
              mode: "browser",
            },
          });
        }
      }
    }
  }, [window.matchMedia("(display-mode: standalone)").matches]);
};
