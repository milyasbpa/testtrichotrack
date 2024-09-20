import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getScanComparisonItems } from "src/core/storage/app/scan_comparison";
import { CustomerComparisonReactQueryKey } from "../keys";
import {
  CustomerComparisonContext,
  CustomerComparisonActionEnum,
} from "../../context";

import { ScanComparisonStorageInterface } from "src/core/models/storage/app";

export const useCustomerComparisonGetScanComparisonItems = () => {
  const { state, dispatch } = useContext(CustomerComparisonContext);

  const query = useQuery<ScanComparisonStorageInterface[] | null>({
    queryKey: CustomerComparisonReactQueryKey.GetScanComparisonItems(),
    queryFn: () => {
      return getScanComparisonItems();
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: CustomerComparisonActionEnum.SetCasesData,
        payload: {
          ...state.cases,
          data: data.map((item) => {
            return {
              id: item.id,
              image_url: item.image,
              region: item.region,
              svc_time: item.svc_time,
              screening: null,
            };
          }),
        },
      });

      // dispatch({
      //   type: ScanComparisonActionEnum.SetChartValue,
      //   payload: data.map((item) => {
      //     return {
      //       id: item.id,
      //       region: item.region,
      //       image: item.image,
      //       icon: item.icon,
      //       date: item.date,
      //       biometric: {
      //         // DOCS: description data rating is just default value
      //         hair_root_pigmentation: {
      //           name: diagnosisDefinition.hair_root_pigmentation.name,
      //           description: "",
      //           data: [],
      //         },
      //         scalp_texture: {
      //           name: diagnosisDefinition.scalp_texture.name,
      //           description: "",
      //           rating: 10,
      //         },
      //         scalp_redness: {
      //           name: diagnosisDefinition.scalp_redness.name,
      //           description: "",
      //           rating: 20,
      //         },
      //         scalp_wrinkles: {
      //           name: diagnosisDefinition.scalp_wrinkle.name,
      //           description: "",
      //           rating: 80,
      //         },
      //       },
      //     };
      //   }),
      // });

      // dispatch({
      //   type: ScanComparisonActionEnum.SetDetailValue,
      //   payload: data.map((item) => {
      //     return {
      //       id: item.id,
      //       region: item.region,
      //       image: item.image,
      //       icon: item.icon,
      //       date: item.date,
      //       data: [
      //         {
      //           name: diagnosisDefinition.average_hair_thickness.name,
      //           value: "",
      //           description:
      //             diagnosisDefinition.average_hair_thickness.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.average_follicle_capacity.name,
      //           value: "",
      //           description:
      //             diagnosisDefinition.average_follicle_capacity.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.thin_hair_rate.name,
      //           value: "",
      //           description: diagnosisDefinition.thin_hair_rate.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.grey_hair_rate.name,
      //           value: "",
      //           description: diagnosisDefinition.grey_hair_rate.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.hair_root_thinning_rate.name,
      //           value: "",
      //           description:
      //             diagnosisDefinition.hair_root_thinning_rate.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.hair_density.name,
      //           value: "",
      //           description: diagnosisDefinition.hair_density.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.follicle_density.name,
      //           value: "",
      //           description: diagnosisDefinition.follicle_density.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.dandruff_count.name,
      //           value: "",
      //           description: diagnosisDefinition.dandruff_count.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.pimple_count.name,
      //           value: "",
      //           description: diagnosisDefinition.pimple_count.definition,
      //         },

      //         {
      //           name: diagnosisDefinition.dead_follicle_count.name,
      //           value: "",
      //           description:
      //             diagnosisDefinition.dead_follicle_count.definition,
      //         },
      //       ],
      //     };
      //   }),
      // });
    }
  }, [query.data, query.isFetching]);

  return query;
};
