export interface GetQuestionnaireRequestInterface {
  language?: string;
}

export interface GetQuestionnaireResponseInterface {
  questions: {
    audience: string[];
    id: number;
    options: string[];
    title: string;
    type: string;
  }[];
  reg_time: string;
  version_id: number;
}
