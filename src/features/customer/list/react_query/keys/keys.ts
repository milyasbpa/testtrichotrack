import { GetCustomersRequestInterface } from "src/core/models/api/customer";

export const CustomerListReactQueryKey = {
  GetUser: () => ["CustomerListReactQueryKey.GetUser"],
  PostLoginByCustomerID: () => [
    "CustomerListReactQueryKey.PostLoginByCustomerID",
  ],
  GetCustomers: (payload?: GetCustomersRequestInterface) => [
    "CustomerListReactQueryKey.GetCustomers",
    [payload] as const,
  ],
  GetCustomer: () => ["CustomerListReactQueryKey.GetCustomer"],
  SetCustomer: () => ["CustomerListReactQueryKey.SetCustomer"],
  SetCustomerID: () => ["CustomerListReactQueryKey.SetCustomerID"],
  GetReadUser: () => ["CustomerListReactQueryKey.GetReadUser"],
  PostAccessToken: () => ["CustomerListReactQueryKey.PostAccessToken"],
  PostSendOTP: () => ["CustomerListReactQueryKey.PostSendOTP"],
};
