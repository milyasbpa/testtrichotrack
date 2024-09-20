import clsx from "clsx";
import { Button } from "src/core/ui/components/button";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { useNavigate, useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { useCompanyLogoPutCompanyLogo } from "../../react_query/hooks";
import { useContext } from "react";
import { CompanyLogoContext } from "../../contexts";

export const FooterCompanyLogo = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state } = useContext(CompanyLogoContext);
  const { mutate: putCompanyLogo } = useCompanyLogoPutCompanyLogo();

  const handleClickBack = () => {
    navigate(
      PrivateRouteURL.routeToStaffDashboardURL({
        locale: locale ?? LocaleRoute.default,
      })
    );
  };
  const handleClickSave = () => {
    putCompanyLogo();
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-start place-items-start w-full gap-x-[1.5rem]"
      )}
    >
      <Button variant="outlined" onClick={handleClickBack}>
        {dictionaries.actions.back.toUpperCase()}
      </Button>
      <Button
        variant="contained"
        disabled={!state.uploader.isValid}
        onClick={handleClickSave}
      >
        {dictionaries.actions.save.toUpperCase()}
      </Button>
    </div>
  );
};
