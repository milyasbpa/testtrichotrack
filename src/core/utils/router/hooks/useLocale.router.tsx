import { LocaleRoute } from "../constants";

export const useLocaleRouter = () => {
  const pathname = window.location.pathname;

  const isLocaleNotFound = pathname.length < 3;
  if (isLocaleNotFound) {
    if (pathname.length === 1) {
      const redirectURL = `/${LocaleRoute.default}`;
      window.location.href = redirectURL;
    } else {
      const redirectURL = `/${LocaleRoute.default}/${pathname.slice(1)}`;
      window.location.href = redirectURL;
    }
  } else if (!LocaleRoute.availableRoute.includes(pathname.slice(1, 3))) {
    const redirectURL = `/${LocaleRoute.default}/${pathname.slice(1, 3)}`;
    window.location.href = redirectURL;
  }
};
