import { AppBar } from "src/core/ui/components/appbar";
import clsx from "clsx";
import { MenuIcon } from "src/core/ui/icons/menu/Menu.icon";
import { Divider } from "src/core/ui/components/divider";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "../../context";

export const NavigationApp = () => {
  const { state, dispatch } = useContext(AppContext);
  const { locale } = useParams<{ locale: string }>();
  const dictionaries = getDictionaries(locale);

  const handleOpenMenu = (_: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: AppActionEnum.SetMenuData,
      payload: {
        ...state.menu,
        is_open: true,
      },
    });
  };
  return (
    <AppBar
      startAddornment={
        <div
          className={clsx(
            "grid grid-flow-col justify-start justify-items-start gap-x-[2rem]"
          )}
        >
          <button
            className={clsx(
              "flex items-center justify-start gap-x-[0.5rem]",
              "text-[1.5rem] text-philippine-green font-bold"
            )}
            onClick={handleOpenMenu}
          >
            <MenuIcon
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[#017948]")}
            />
          </button>
        </div>
      }
      endAddornment={
        <div
          className={clsx(
            "grid grid-flow-col justify-end justify-items-end items-center content-center gap-x-[2rem]"
          )}
        >
          {!!state.company.image_url && (
            <button>
              <img
                src={state.company.image_url}
                alt={"drscalp-logo"}
                className={clsx("h-[60px] aspect-auto")}
              />
            </button>
          )}

          {!!state.company.image_url && <Divider variant={"vertical"} />}

          <img src={dictionaries.alvisual.logo} alt={"drscalp-logo"} />
        </div>
      }
    />
  );
};
