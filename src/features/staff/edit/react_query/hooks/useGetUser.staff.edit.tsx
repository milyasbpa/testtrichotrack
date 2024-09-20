import { useQuery } from "@tanstack/react-query";
import { getUser } from "src/core/storage/app/user";

import { UserStorageInterface } from "src/core/models/storage/app";
import { StaffEditReactQueryKey } from "../keys";

export const useStaffEditGetUser = () => {
  const query = useQuery<UserStorageInterface>({
    queryKey: StaffEditReactQueryKey.GetUser(),
    queryFn: () => {
      return getUser();
    },
    retry: 0,

    // onSuccess(data) {
    //   if (data !== null) {
    //     dispatchAuth({
    //       type: AuthActionEnum.SetRoleValue,
    //       payload: {
    //         ...authState.role,
    //         value: data.permission,
    //       },
    //     });
    //   }
    // },
  });

  return query;
};
