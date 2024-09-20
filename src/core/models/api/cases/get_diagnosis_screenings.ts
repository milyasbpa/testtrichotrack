export interface GetDiagnosisScreeningsRequestInterface {
  path: {
    case_id: number;
  };
  params: {
    language?: string;
  };
}

export interface GetDiagnosisScreeningsResponseInterface {
  [key: string]: {
    name: string;
    unit: string;
    description: string;
    mapping_figure: string;
    value: number | { [key: string]: number };
  };
}
