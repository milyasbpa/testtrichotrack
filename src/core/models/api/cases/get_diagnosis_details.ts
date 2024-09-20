export interface GetDiagnosisDetailsRequestInterface {
  path: {
    case_id: number;
  };
  params: {
    metric: string;
    language?: string;
  };
}

export interface GetDiagnosisDetailsResponseInterface {
  description: string;
  factors: {
    factor: string;
    name: string;
    description: string;
    value: number;
    mapping_figure: string;
    evidences: {
      scan_id: number;
      value: number;
      region: string;
      image: string;
      svc_time: string;
    }[];
  }[];
}
