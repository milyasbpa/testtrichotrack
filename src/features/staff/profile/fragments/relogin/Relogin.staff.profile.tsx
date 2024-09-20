import { useContext } from "react";
import { InformationModal } from "src/core/ui/components/information_modal";
import { StaffProfileContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import Cookies from "universal-cookie";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const ReloginStaffProfile = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(StaffProfileContext);
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);

  const handleLogout = async () => {
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
    <InformationModal
      open={state.form.relogin_modal.open}
      onClose={handleLogout}
      image_url={dictionaries.relogin_dialog.image_url}
      cta={{
        primary: {
          children: dictionaries.relogin_dialog.ok,
          onClick: handleLogout,
        },
      }}
    />
  );
};
