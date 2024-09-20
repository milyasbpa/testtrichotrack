import { useContext } from "react";
import { AppActionEnum, AppContext } from "../../context";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import SVGIcon from "src/core/ui/icons";
import { ENVIRONMENT } from "src/core/constants";
import { Drawer } from "src/core/ui/components/drawer";
import { Button } from "src/core/ui/components/button";

export interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

export const MenuApp = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const headerMenuList =
    state.platform === undefined
      ? []
      : dictionaries.menu.items.filter((item) => item.group_id === "header");

  const menuList =
    state.platform.mode === undefined
      ? []
      : state.auth.role === null
      ? dictionaries.menu.items
          .filter(
            (item) => item.group_id !== "footer" && item.group_id !== "header"
          )
          .filter((groupItem) => groupItem.roles.includes("COMPANY"))
          .map((groupItem) => {
            return {
              ...groupItem,
              group_items: groupItem.group_items
                .filter((item) => {
                  return item.roles.includes("COMPANY");
                })
                .filter((item) =>
                  item.platforms.includes(state.platform.mode ?? "")
                ),
            };
          })
      : dictionaries.menu.items
          .filter(
            (item) => item.group_id !== "footer" && item.group_id !== "header"
          )
          .filter((groupItem) =>
            groupItem.roles.includes(state.auth.role ?? "")
          )
          .map((groupItem) => {
            return {
              ...groupItem,
              group_items: groupItem.group_items.filter((item) => {
                return item.roles.includes(state.auth.role ?? "");
              }),
            };
          })
          .filter((item) => item.platforms.includes(state.platform.mode ?? ""));

  const footerMenuList =
    state.platform.mode === undefined
      ? []
      : state.auth.role === null
      ? dictionaries.menu.items
          .filter((item) => item.group_id === "footer")
          .filter((groupItem) => groupItem.roles.includes("COMPANY"))
          .map((groupItem) => {
            return {
              ...groupItem,
              group_items: groupItem.group_items.filter((item) => {
                return item.roles.includes("COMPANY");
              }),
            };
          })
          .map((groupItem) => {
            return {
              ...groupItem,
              group_items: groupItem.group_items.filter((item) => {
                return state.screen.is_fullscreen
                  ? item.id !== "fullscreen"
                  : item.id !== "exit_fullscreen";
              }),
            };
          })
      : dictionaries.menu.items
          .filter((item) => item.group_id === "footer")
          .filter((groupItem) =>
            groupItem.roles.includes(state.auth.role ?? "")
          )
          .map((groupItem) => {
            return {
              ...groupItem,
              group_items: groupItem.group_items
                .filter((item) => {
                  return state.screen.is_fullscreen
                    ? item.id !== "fullscreen"
                    : item.id !== "exit_fullscreen";
                })
                .filter((item) => item.roles.includes(state.auth.role ?? "")),
            };
          });

  if (!state.menu.is_open) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: AppActionEnum.SetMenuData,
      payload: {
        ...state.menu,
        is_open: false,
      },
    });
  };

  const handleClickHeaderMenu = (data: { id: string }) => {
    if (data.id.toLowerCase() === "close") {
      dispatch({
        type: AppActionEnum.SetMenuData,
        payload: {
          ...state.menu,
          is_open: false,
        },
      });
    }
  };

  const handleClickMenu = (data: { id: string }) => {
    dispatch({
      type: AppActionEnum.SetMenuData,
      payload: {
        ...state.menu,
        is_open: false,
      },
    });
    if (data.id === "language") {
      dispatch({
        type: AppActionEnum.SetLanguageData,
        payload: {
          ...state.language,
          feature: {
            ...state.language.feature,
            is_open: true,
          },
        },
      });
    }
    if (data.id === "user_guide") {
      dispatch({
        type: AppActionEnum.SetUserGuideData,
        payload: {
          ...state.user_guide,
          feature: {
            ...state.user_guide,
            is_open: true,
          },
        },
      });
    }
    if (data.id === "scan_report") {
      dispatch({
        type: AppActionEnum.SetReportData,
        payload: {
          ...state.report,
          feature: {
            ...state.report.feature,
            is_open: true,
          },
        },
      });
    }
  };

  const handleClickFooterMenu = (data: { id: string }) => {
    if (data.id === "logout") {
      const role = state.auth.role;
      if (!role?.includes("CUSTOMER")) {
        navigate(
          PrivateRouteURL.routeToStaffLogoutURL({
            locale: locale ?? LocaleRoute.default,
          })
        );
      }
      if (role?.includes("CUSTOMER")) {
        navigate(
          PrivateRouteURL.routeToCustomerLogoutURL({
            locale: locale ?? LocaleRoute.default,
          })
        );
      }
    }
    if (data.id === "fullscreen") {
      let elem: DocumentElementWithFullscreen =
        document.getElementsByTagName("body")[0];

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      dispatch({
        type: AppActionEnum.SetScreenData,
        payload: {
          ...state.screen,
          is_fullscreen: true,
        },
      });
    }
    if (data.id === "exit_fullscreen") {
      dispatch({
        type: AppActionEnum.SetScreenData,
        payload: {
          ...state.screen,
          is_fullscreen: false,
        },
      });
      document.exitFullscreen();
    }
  };

  return (
    <Drawer open={state.menu.is_open} onClose={handleClose}>
      <div
        className={clsx(
          "grid-cols-1 place-content-start place-items-start gap-y-[70px]",
          "w-full"
        )}
      >
        {headerMenuList.map((groupMenu) => {
          return groupMenu.group_items.map((menu, menuIndex) => {
            return (
              <Button
                key={menuIndex}
                variant="menu"
                href={menu.link.replace(
                  ":locale",
                  locale ?? LocaleRoute.default
                )}
                onClick={() => handleClickHeaderMenu({ id: menu.id })}
              >
                {!!menu.image_url.length && (
                  <SVGIcon
                    key={menuIndex}
                    name={menu.image_url as any}
                    className={clsx(
                      "w-[2rem] h-[2rem]",
                      "fill-philippine-green"
                    )}
                  />
                )}
                {menu.name}
              </Button>
            );
          });
        })}

        <div className={clsx("w-full")}>
          {menuList.map((groupMenu, groupMenuIndex) => (
            <div
              key={groupMenuIndex}
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "flex items-start justify-start",
                  "w-full",
                  "text-[1.25rem] text-spanish-gray font-semibold uppercase"
                )}
              >
                {groupMenu.group_name}
              </div>
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
                  "w-full"
                )}
              >
                {groupMenu.group_items.map((menu, menuIndex) => {
                  return (
                    <Button
                      key={menuIndex}
                      variant="menu"
                      className={clsx(
                        "!grid !grid-flow-col !justify-start !justify-items-start !items-center !content-center !gap-[0.5rem]",
                        "!w-full",
                        menu.id === "scan" &&
                          //   clientCameraState.configuration.selected === null &&
                          ENVIRONMENT.MOCK_MICROSCOPE_CAMERA !== "true"
                          ? "!opacity-80 !text-granite-gray"
                          : menu.id === "staff_live_camera" &&
                            //   clientCameraState.configuration.selected === null &&
                            ENVIRONMENT.MOCK_MICROSCOPE_CAMERA !== "true"
                          ? "!opacity-80 !text-granite-gray"
                          : "!opacity-100 !text-white-87"
                      )}
                      href={menu.link.replace(
                        ":locale",
                        locale ?? LocaleRoute.default
                      )}
                      disabled={
                        menu.name === "staff_scan" &&
                        //   clientCameraState.configuration.selected === null &&
                        ENVIRONMENT.MOCK_MICROSCOPE_CAMERA !== "true"
                          ? true
                          : menu.name === "staff_live_camera" &&
                            //   clientCameraState.configuration.selected === null &&
                            ENVIRONMENT.MOCK_MICROSCOPE_CAMERA !== "true"
                          ? true
                          : false
                      }
                      onClick={() => handleClickMenu({ id: menu.id })}
                    >
                      {!!menu.image_url.length && (
                        <SVGIcon
                          key={menuIndex}
                          name={menu.image_url as any}
                          className={clsx(
                            "w-[2rem] h-[2rem]",
                            menu.id !== "user_guide"
                              ? "fill-[white]"
                              : "stroke-[white]"
                          )}
                        />
                      )}
                      {menu.name}
                    </Button>
                  );
                })}
              </div>

              <div
                className={clsx(
                  "w-full h-[1px]",
                  "bg-charleston-green",
                  groupMenuIndex !== menuList.length - 1 ? "block" : "hidden"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {footerMenuList.map((groupMenu) => {
          return groupMenu.group_items.map((menu, menuIndex) => {
            return (
              <Button
                key={menuIndex}
                variant="menu"
                className={clsx(
                  menu.id === "logout"
                    ? "!text-philippine-green"
                    : "!text-white-80"
                )}
                href={menu.link.replace(
                  ":locale",
                  locale ?? LocaleRoute.default
                )}
                onClick={() => handleClickFooterMenu({ id: menu.id })}
              >
                {!!menu.image_url.length && (
                  <SVGIcon
                    key={menuIndex}
                    name={menu.image_url as any}
                    className={clsx(
                      "w-[2rem] h-[2rem]",
                      menu.id === "logout"
                        ? "!fill-philippine-green"
                        : "!fill-white"
                    )}
                  />
                )}
                {menu.name}
              </Button>
            );
          });
        })}
      </div>
    </Drawer>
  );
};
