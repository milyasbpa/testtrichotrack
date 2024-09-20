import * as React from "react";
import { AppActionEnum, AppContext } from "../../context";
import { UserGuideBottomSheetApp } from "../../components/user_guide_bottom_sheet/UserGuideBottomSheet.app";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { ENVIRONMENT } from "src/core/constants";

export const UserGuideApp = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = React.useContext(AppContext);

  const handleClose = () => {
    dispatch({
      type: AppActionEnum.SetUserGuideData,
      payload: {
        ...state.user_guide,
        feature: {
          ...state.user_guide,
          is_open: false,
        },
      },
    });
  };
  return (
    <UserGuideBottomSheetApp
      title={dictionaries.user_guide.title}
      description={dictionaries.user_guide.description}
      open={state.user_guide.feature.is_open}
      list={dictionaries.user_guide.items
        .filter((item) => item.version === ENVIRONMENT.APP_VERSON)
        .map((item) => {
          return {
            ...item,
            file_url: item.file_url.replace("{{host}}", ENVIRONMENT.APP_URL),
          };
        })}
      onClose={handleClose}
    />
  );
};
