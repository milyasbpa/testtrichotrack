import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";

import { getDictionaries } from "../../i18n";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { Divider } from "src/core/ui/components/divider";
import { Avatar } from "src/core/ui/components/avatar";
import { useStaffHomeClock } from "../../utils/clock/hooks";
import { AppContext } from "src/core/modules/app/context";
import SVGIcon from "src/core/ui/icons";

export const HomeStaffDashboard = () => {
  const navigate = useNavigate();

  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state: appState } = useContext(AppContext);

  const clock = useStaffHomeClock();

  const handleClickLogout = (_: React.MouseEvent<HTMLButtonElement>) => {
    navigate(
      PrivateRouteURL.routeToStaffLogoutURL({
        locale: locale ?? LocaleRoute.default,
      })
    );
  };

  const staff = appState.user.staff;
  const initial = !staff || !staff.name ? "" : staff.name.charAt(0);
  const photo = !staff || !staff.photo ? "" : staff.photo ?? "";
  const menu =
    !appState.platform.mode || !appState.auth.role
      ? []
      : dictionaries.menu.items
          .filter((item) => item.roles.includes(appState.auth.role ?? ""))
          .filter((item) =>
            item.platforms.includes(appState.platform.mode ?? "")
          );
  const name = !staff || !staff.name ? "" : staff.name;
  const greeting = !appState.platform.mode
    ? ""
    : `${name} ${dictionaries.is_serving}`;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[2rem]",
        "w-full"
      )}
    >
      <section
        className={clsx(
          "grid grid-cols-[auto_auto] items-center content-center justify-between justify-items-start gap-x-[0.5rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[74px_1fr] gap-x-[0.5rem] items-center content-center justify-start justify-items-start"
          )}
        >
          <Avatar size={"sm"} src={photo}>
            {initial}
          </Avatar>

          <div
            className={clsx(
              "grid grid-cols-1 gap-y-[0.5rem] justify-start justify-items-start items-center content-center"
            )}
          >
            <div
              className={clsx(
                "grid gap-y-[0.5rem] grid-cols-1 content-center items-center justify-start justify-items-start",
                "w-full"
              )}
            >
              <h1
                className={clsx(
                  "text-[1.5rem] text-white font-normal truncate",
                  "w-full"
                )}
              >
                {greeting}
              </h1>
              <p
                className={clsx(
                  "text-[1.125rem] text-[#FFFFFF99] font-regular"
                )}
              >
                {clock}
              </p>
            </div>
          </div>
        </div>

        <button onClick={handleClickLogout}>
          <div
            className={clsx(
              "grid justify-end justify-items-end items-center content-center gap-x-[0.5rem] grid-cols-[auto_auto]"
            )}
          >
            <p
              className={clsx("text-[1.25rem] font-bold text-dartmouth-green")}
            >
              {dictionaries.logout.toUpperCase()}
            </p>

            <SVGIcon
              name="ExitToApp"
              className={clsx("w-[22px] h-[22px]", "fill-philippine-green")}
            />
          </div>
        </button>
      </section>

      <Divider />

      <div
        className={clsx(
          "grid gap-[1rem] grid-cols-1 items-start content-start justify-start justify-items-start",
          "w-full h-[340px]",
          "overflow-auto"
        )}
      >
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.link.replace(":locale", locale ?? LocaleRoute.default)}
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "bg-[#262626]",
              "rounded-[1rem]",
              "p-[1rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-col justify-start justify-items-start items-center content-center gap-[1rem]",
                "w-full"
              )}
            >
              <SVGIcon
                name={item.image_url as any}
                className={clsx("w-[50px] h-[50px]", "fill-[white]")}
              />
              <div
                className={clsx(
                  "grid grid-cols-1 justify-start justify-items-start items-center content-center gap-[0.5rem]",
                  "w-full"
                )}
              >
                <p className={clsx("text-[1.125rem] font-bold text-[#FAFAFA]")}>
                  {item.name}
                </p>
                <p className={clsx("text-[1rem] font-normal text-[#999999]")}>
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
