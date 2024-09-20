import { GetCustomerRequestInterface } from "src/core/models/api/customer";

export const CustomerHomeReactQueryKey = {
  GetCustomer: (payload?: GetCustomerRequestInterface) => [
    "CustomerHomeReactQueryKey.GetCustomer",
    [payload] as const,
  ],
};
