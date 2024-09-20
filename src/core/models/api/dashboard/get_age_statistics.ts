export interface GetAgeStatisticsRequestInterface {}

export interface GetAgeStatisticsRequestInterface {
  gender?: string;
  inactive_threshold?: number;
}

export type GetAgeStatisticsResponseInterface = number[][];
