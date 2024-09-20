export interface GetCarePlanByIdRequestInterface {
  careplan_id: number;
  rating: number;
  language?: string;
}

export interface GetCarePlanByIdSuccessResponseInterface {
  id: number;
  name: string;
  description: string;
  photo: string;
  procedures: {
    [key: string]: {
      name: string;
      description: string;
      photo: string;
    };
  };
  schedule: string;
}
