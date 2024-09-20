import { useQuery } from "@tanstack/react-query";
import { getUser } from "src/core/storage/app/user";
import { UserStorageInterface } from "src/core/models/storage/app";
import { DisplayListReactQueryKey } from "../keys";

export const useDisplayGetUser = () => {
  const query = useQuery<UserStorageInterface>({
    queryKey: DisplayListReactQueryKey.GetUser(),
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
