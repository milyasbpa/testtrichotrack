import { useLocation, useNavigate, useParams } from "react-router-dom";
import LanguageBottomSheet from "../../components/language_bottom_sheet/LanguageBottomSheet.app";
import { getDictionaries } from "../../i18n";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "../../context";

export const LanguageApp = () => {
  const { locale } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(AppContext);

  const handleSelect = (data: { id: string; name: string }) => {
    dispatch({
      type: AppActionEnum.SetLanguageData,
      payload: {
        ...state.language,
        feature: {
          ...state.language.feature,
          is_open: false,
        },
      },
    });
    const newPathname = `/${data.id}${pathname.slice(3)}`;
    navigate(newPathname);
  };

  const handleClose = () => {
    dispatch({
      type: AppActionEnum.SetLanguageData,
      payload: {
        ...state.language,
        feature: {
          ...state.language.feature,
          is_open: false,
        },
      },
    });
  };
  return (
    <LanguageBottomSheet
      title={dictionaries.language.title}
      description={dictionaries.language.description}
      open={state.language.feature.is_open}
      items={dictionaries.language.items}
      selectedText={dictionaries.language.selected}
      selected={state.language.feature.selected}
      onSelect={handleSelect}
      onClose={handleClose}
    />
  );
};
