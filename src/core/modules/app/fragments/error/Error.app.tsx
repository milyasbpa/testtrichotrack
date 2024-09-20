import clsx from "clsx";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import Cookies from "universal-cookie";
import { Button } from "src/core/ui/components/button";

export const ErrorApp = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(AppContext);

  const errorItem =
    dictionaries.error.items.find((item) => item.id === state.error.code) ??
    null;
  const message = errorItem?.message ?? "";
  const description = errorItem?.description ?? "";
  const imageURL = errorItem?.image_url ?? "";
  const cta = errorItem?.cta ?? null;

  const handleClickPrimaryCTA = async () => {
    if (state.error.code === "session_timeout") {
      const cookies = new Cookies();
      await cookies.remove("customer-token", { path: "/" });
      await cookies.remove("staff-token", { path: "/" });
      await cookies.remove("token", { path: "/" });
      await dispatch({
        type: AppActionEnum.SetAuthData,
        payload: {
          ...state.auth,
          role: null,
        },
      });
      await dispatch({
        type: AppActionEnum.SetErrorData,
        payload: {
          ...state.error,
          status: false,
          code: null,
        },
      });

      navigate(
        PrivateRouteURL.routeToStaffLoginURL({
          locale: locale,
        })
      );
    }
    if (
      state.error.code === "credit_points_exhausted" ||
      state.error.code === "subscription_expired"
    ) {
      await dispatch({
        type: AppActionEnum.SetErrorData,
        payload: {
          ...state.error,
          status: false,
          code: null,
        },
      });
      navigate(
        PrivateRouteURL.routeToCompanyBillingURL({
          locale: locale,
        })
      );
    }
  };
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-between",
        "px-[2rem] py-[2rem]",
        "w-full h-full"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-between",
          "bg-white-04",
          "w-full h-full",
          "px-[1.5rem] py-[1.5rem]"
        )}
      >
        <div />

        <div
          className={clsx(
            "grid grid-cols-1 place-items-center place-content-center",
            "relative"
          )}
        >
          <p className={clsx("text-center text-[2rem] text-white font-bold")}>
            {message}
          </p>

          <img src={imageURL} />

          <p
            className={clsx(
              "text-center text-[1.25rem] text-white font-regular"
            )}
          >
            {description}
          </p>
        </div>

        {cta !== null && (
          <div
            className={clsx(
              "grid gap-[1.5rem] grid-cols-1 items-center content-center justify-center justify-items-center",
              "w-full",
              "box-border"
            )}
          >
            <Button variant="contained" onClick={handleClickPrimaryCTA}>
              {cta.primary.children.toUpperCase()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
