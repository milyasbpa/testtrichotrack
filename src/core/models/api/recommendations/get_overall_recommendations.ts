export interface GetOverallRecommendationsRequestInterface {
  language?: string;
}

export interface GetOverallRecommendationsSuccessResponseInterface {
  issue: string;
  name: string;
  stages: {
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
  }[];
}
