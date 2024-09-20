import { LocaleRoute } from "./locale";

export const PublicRouteURL = {
  routeToClientSecretURL: (data?: { locale?: string }) =>
    `/:locale`.replace(":locale", data?.locale ?? LocaleRoute.default),
};
