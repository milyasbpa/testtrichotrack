import clsx from "clsx";
import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ENVIRONMENT } from "src/core/constants";
import {
  LocaleRoute,
  PrivateRouteURL,
  PublicRouteURL,
} from "src/core/utils/router/constants";
import { AppContext } from "../../context";

export const VersionApp = () => {
  const { state } = useContext(AppContext);
  const version = `${state.version.api} (${ENVIRONMENT.APP_BUILD_VERSION})`;
  const { locale } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  if (
    !pathname.includes(
      PublicRouteURL.routeToClientSecretURL({
        locale: locale ?? LocaleRoute.default,
      })
    )
  )
    return null;
  if (
    !pathname.includes(
      PrivateRouteURL.routeToStaffLoginURL({
        locale: locale ?? LocaleRoute.default,
      })
    )
  )
    return null;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center justify-items-center",
        "fixed bottom-[32px] left-[50%]",
        "translate-x-[-50%]",
        "box-border"
      )}
    >
      <p
        className={clsx(
          "text-[1.25rem] text-white-38 font-regular text-center"
        )}
      >
        {version}
      </p>
    </div>
  );
};
