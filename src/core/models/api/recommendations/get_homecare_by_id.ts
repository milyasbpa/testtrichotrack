export interface GetHomeCareByIdRequestInterface {
  path: {
    homecare_id: number;
  };
  params: {
    language?: string;
  };
}

export interface GetHomeCareByIdSuccessResponseInterface {
  id: number;
  name: string;
  description: string;
  photo: string;
  products: {
    [key: string]: {
      name: string;
      description: string;
      photo: string;
    };
  };
  ingredients: {
    [key: string]: {
      ingredient: string;
      effects: string;
      photo: string;
    };
  };
  instructions: {
    [key: string]: {
      description: string;
      photo: string;
    };
  };
}
