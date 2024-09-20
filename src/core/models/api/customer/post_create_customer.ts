export interface PostCreateExtraInfoCustomerRequestInterface {
  citizenship?: string;
  marital_status?: string;
  address?: string;

  receive_promotion?: string;
  profession?: string;
}

export interface PostCreateQuestionnaireCustomerRequestInterface {
  version_id?: number;
  answers?: {
    "1"?: string[];
    "2"?: string[];
    "3"?: string[];
    "4"?: string[];
    "5"?: string[];
    "6"?: string[];
    "7"?: string[];
    "8"?: string[];
    "9"?: string[];
    "10"?: string[];
    "11"?: string[];
    "12"?: string[];
    "13"?: string[];
  };
}
export interface PostCreateCustomerRequestInterface {
  name: string;
  mobile: string;
  gender: string;
  birthday: string;
  email?: string;
  race: string;
  photo?: string;
  extra_info?: PostCreateExtraInfoCustomerRequestInterface;
  questionnaire?: PostCreateQuestionnaireCustomerRequestInterface;
}
export interface PostCreateCustomer200SuccessResponseInterface {
  access_token: string;
  token_type: string;
}

export interface PostCreateCustomer401SuccessResponseInterface {
  detail: string;
}
