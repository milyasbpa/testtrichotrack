export interface GetRecommendationsMetricRequestInterface {
  params: {
    language?: string;
    metric: string;
    rating: number;
  };
}

export interface GetRecommendationsMetricSuccessResponseInterface {
  name: string;
  careplans: {
    id: number;
    name: string;
    description: string;
    photo: string;
  }[];
  homecares: {
    id: number;
    name: string;
    description: string;
    photo: string;
  }[];
  description: string;
}
