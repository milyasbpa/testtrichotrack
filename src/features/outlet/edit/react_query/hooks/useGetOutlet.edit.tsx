import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { fetchGetOutlet } from "src/core/services/outlet";
import {
  GetOutlet200SuccessResponseInterface,
  GetOutletRequestInterface,
} from "src/core/models/api/outlet";
import { EditOutletContext } from "../../contexts/EditOutlet.context";
import { EditOutletActionEnum } from "../../contexts/EditOutlet.types";
import { EditOutletReactQueryKey } from "../keys";
import { AxiosError } from "axios";
import { getDictionaries as getAppDictionaries } from "src/core/modules/app/i18n";
import { useParams } from "react-router-dom";

export const useOutletEditGetOutlet = () => {
  const { locale, outletID } = useParams();
  const appDictionaries = getAppDictionaries(locale);
  const { state, dispatch } = useContext(EditOutletContext);

  const query = useQuery<GetOutlet200SuccessResponseInterface, AxiosError<any>>(
    {
      queryKey: EditOutletReactQueryKey.GetOutlet(),
      queryFn: () => {
        const payload: GetOutletRequestInterface = {
          outlet_id: parseInt(outletID ?? "-1"),
        };
        return fetchGetOutlet(payload);
      },
      enabled: !!outletID,
    }
  );

  useEffect(() => {
    if (!!query.data) {
      const data = query.data;
      dispatch({
        type: EditOutletActionEnum.SetFormData,
        payload: {
          ...state.form,
          photo_profile: {
            ...state.form.photo_profile,
            value:
              data.photo !== undefined && data.photo !== null ? data.photo : "",
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
  }, [query.data]);

  return query;
};
