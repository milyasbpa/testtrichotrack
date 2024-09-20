import { GetHomeCareByIdRequestInterface } from "src/core/models/api/recommendations";

export const CustomerHomeCareReactQueryKey = {
  GetHomeCaresStorage: () => [
    "CustomerHomeCareReactQueryKey.GetHomeCaresStorage",
  ],

  GetHomeCareById: (payload: GetHomeCareByIdRequestInterface) => [
    "CustomerHomeCareReactQueryKey.GetHomeCareById",
    [payload] as const,
  ],
};
