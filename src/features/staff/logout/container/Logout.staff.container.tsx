import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { AppContainer } from "src/core/modules/app/container";
import { Button } from "src/core/ui/components/button";
import Cookies from "universal-cookie";
import { PrivateRouteURL } from "src/core/utils/router/constants";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const StaffLogoutContainer = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClickBack = (_: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  const handleClickConfirm = async (_: React.MouseEvent<HTMLButtonElement>) => {
    const cookies = new Cookies();

    await cookies.remove("staff-token", { path: "/" });
    await cookies.remove("token", { path: "/" });
    await dispatchApp({
      type: AppActionEnum.SetAuthData,
      payload: {
        ...appState.auth,
        role: null,
      },
    });

    navigate(
      PrivateRouteURL.routeToStaffLoginURL({
        locale: locale,
      })
    );
  };

  return (
    <AppContainer>
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
              {dictionaries.confirmation.message}
            </p>

            <img
              src={dictionaries.confirmation.image_url}
              alt={dictionaries.confirmation.image_alt}
            />

            <p
              className={clsx(
                "text-center text-[1.25rem] text-white font-regular"
              )}
            >
              {dictionaries.confirmation.description}
            </p>
          </div>

          <div
            className={clsx(
              "grid gap-[1.5rem] grid-cols-2 items-center content-center justify-center justify-items-center",
              "w-full",
              "box-border"
            )}
          >
            <Button variant="outlined" onClick={handleClickBack}>
              {dictionaries.confirmation.no.toUpperCase()}
            </Button>

            <Button variant="contained" onClick={handleClickConfirm}>
              {dictionaries.confirmation.yes.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};
