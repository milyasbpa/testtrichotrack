import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { fetchGetOutlet } from "src/core/services/outlet";
import {
  GetOutlet200SuccessResponseInterface,
  GetOutletRequestInterface,
} from "src/core/models/api/outlet";
import { ViewOutletContext } from "../../context/ViewOutlet.context";
import { ViewOutletActionEnum } from "../../context/ViewOutlet.types";
import { ViewOutletReactQueryKey } from "../keys";
import { useParams } from "react-router-dom";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { AppContext } from "src/core/modules/app/context";

export const useViewGetOutlet = () => {
  const { locale } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(ViewOutletContext);

  const payload: GetOutletRequestInterface = {
    outlet_id: appState.user.outlet?.base_id ?? -1,
  };

  const query = useQuery<GetOutlet200SuccessResponseInterface>({
    queryKey: ViewOutletReactQueryKey.GetOutlet(),
    queryFn: () => {
      return fetchGetOutlet(payload);
    },
    enabled: !!appState.user.outlet,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ViewOutletActionEnum.SetFormData,
        payload: {
          ...state.form,
          photo_profile: {
            ...state.form.photo_profile,
            value: data.photo !== undefined ? data.photo : "",
          },
          fullname: {
            ...state.form.fullname,
            value: data.name,
          },

          address: {
            ...state.form.address,
            value: data.address !== undefined ? data.address : "",
          },
          phonenumber: {
            ...state.form.phonenumber,
            value:
              data.mobile === undefined
                ? appDictionaries.phone_number.items.find(
                    (item) => item.id === "+65"
                  )?.id ?? ""
                : data.mobile === null
                ? appDictionaries.phone_number.items.find(
                    (item) => item.id === "+65"
                  )?.id ?? ""
                : `${
                    appDictionaries.phone_number.items.find(
                      (item) => item.id === `+${data.mobile?.slice(0, 2)}`
                    )?.id ?? ""
                  }${data.mobile.slice(3)}`,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
