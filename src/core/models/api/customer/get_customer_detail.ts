export interface GetCustomerDetailRequestInterface {
  customer_id: number;
}

export interface GetCustomerDetailSuccessResponseInterface {
  id: number;
  reg_time: string;
  name: string;
  mobile: string;
  gender: string;
  race: null | string;
  birthday: string;
  email?: string | null;
  photo: null | string;
  status: string;
  extra_info: null | {
    citizenship?: null | string;
    marital_status?: null | string;
    address?: null | string;
    receive_promotion?: null | string;
    profession?: null | string;
  };
  questionnaire: null | {
    version_id?: number;
    answers?: {
      1: string[];
      2: string[];
      3: string[];
      4: string[];
      5: string[];
      6: string[];
      7: string[];
      8: string[];
      9: string[];
      10: string[];
      11: string[];
      12: string[];
      13: string[];
    };
  };
}
