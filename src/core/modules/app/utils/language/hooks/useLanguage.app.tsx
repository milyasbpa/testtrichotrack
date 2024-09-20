import { useEffect, useContext } from "react";
import { AppActionEnum, AppContext } from "../../../context";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../../i18n";
import { LocaleRoute } from "src/core/utils/router/constants";

export const useAppLanguage = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: AppActionEnum.SetLanguageData,
      payload: {
        ...state.language,
        feature: {
          ...state.language.feature,
          selected:
            dictionaries.language.items.find(
              (item) => item.id === (locale ?? LocaleRoute.default)
            ) ?? null,
        },
      },
    });
  }, [locale]);
};
