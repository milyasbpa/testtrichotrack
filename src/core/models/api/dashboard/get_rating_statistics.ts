export interface GetRatingStatisticsRequestInterface {
  min_age: string;
  max_age: string;
  gender: string | null;
  race: string | null;
  inactive_threshold?: number;
}

export interface GetRatingStatisticsResponseInterface {
  [key: string]: number[];
}
