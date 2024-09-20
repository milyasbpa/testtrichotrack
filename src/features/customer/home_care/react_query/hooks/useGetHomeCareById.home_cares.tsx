import { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetHomeCareByIdRequestInterface,
  GetHomeCareByIdSuccessResponseInterface,
} from "src/core/models/api/recommendations";
import { fetchGetHomecareById } from "src/core/services/recommendation";
import { AxiosError } from "axios";
import { CustomerHomeCareReactQueryKey } from "../keys";
import {
  CustomerHomeCareActionEnum,
  CustomerHomeCareContext,
} from "../../context";
import { useParams } from "react-router-dom";

export const useHomeCaresGetHomeCareById = () => {
  const { locale, id } = useParams();
  const { state, dispatch } = useContext(CustomerHomeCareContext);

  const payload: GetHomeCareByIdRequestInterface = useMemo(() => {
    return {
      path: {
        homecare_id: parseInt(id ?? "-1"),
      },
      params: {
        language: locale === "zh" ? "Chinese" : "English",
      },
    };
  }, [id, locale]);

  const query = useQuery<GetHomeCareByIdSuccessResponseInterface, AxiosError>({
    queryKey: CustomerHomeCareReactQueryKey.GetHomeCareById(payload),
    queryFn: () => {
      return fetchGetHomecareById(payload);
    },
    retry: 0,
    enabled: !!id,
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerHomeCareActionEnum.SetTreatmentValue,
        payload: {
          ...state.treatment,
          name: data.name,
          description: data.description,
          image: data.photo,
        },
      });

      dispatch({
        type: CustomerHomeCareActionEnum.SetProductsData,
        payload: Object.keys(data.products).map((item) => {
          return {
            name: data.products[item].name,
            description: data.products[item].description,
            image: data.products[item].photo,
          };
        }),
      });

      dispatch({
        type: CustomerHomeCareActionEnum.SetIngredientValue,
        payload: {
          ...state.ingredient,
          tab: {
            ...state.ingredient.tab,
            list: Object.keys(data.ingredients).map(
              (key) => data.ingredients[key].ingredient
            ),
          },
          items: Object.keys(data.ingredients).map((key) => {
            return {
              description: data.ingredients[key].effects,
              image: data.ingredients[key].photo,
            };
          }),
        },
      });

      dispatch({
        type: CustomerHomeCareActionEnum.SetInstructionValue,
        payload: {
          ...state.instruction,
          tab: {
            ...state.instruction.tab,
            list: Object.keys(data.instructions).map((item) => `${item}`),
          },
          items: Object.keys(data.instructions).map((key) => {
            return {
              description: data.instructions[key].description,
              image: data.instructions[key].photo,
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};
