export interface GetProductsRequestInterface {
  product_id: number;
}

export interface GetProducts200SuccessResponseInterface {
  id: number;
  reg_time: string;
  name: string;
  intro: {
    title: string;
    txt: string;
    img: string;
  };
  ingredients: {
    "1": {
      title: string;
      txt: string;
      img: string;
    };
  };
  effects: {
    "1": {
      title: string;
      txt: string;
      img: string;
    };
  };
  extra: {
    "1": {
      title: string;
      txt: string;
      img: string;
    };
  };
}
