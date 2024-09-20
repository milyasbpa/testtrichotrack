export interface GetDiagnosisOverviewRequestInterface {
  path: {
    case_id: number;
  };
  params: {
    language?: string;
  };
}

export interface GetDiagnosisOverviewResponseInterface {
  [key: string]: {
    name: string;
    rating: number;
    level: string;
  };
}
