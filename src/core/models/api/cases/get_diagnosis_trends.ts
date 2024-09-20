export interface GetDiagnosisTrendsRequestInterface {
  path: {
    case_id: number;
  };
  params: {
    language?: string;
  };
}

export interface GetDiagnosisTrendsResponseInterface {
  trends: {
    svc_time: string;
    overview: {
      [key: string]: number;
    };
  }[];
}
