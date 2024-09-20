export interface GetDiagnosisIssueRequestInterface {
  params: {
    metric: string;
    language?: string;
  };
}

export interface GetDiagnosisIssueResponseInterface {
  id: number;
  name: string;
  photo: string;
  introduction: {
    name: string;
    description: string;
  };
  prevalence: {
    name: string;
    description: string;
  };
  symptoms: {
    name: string;
    description: string;
  };
  causes: {
    name: string;
    description: string;
  };
  prevention: {
    name: string;
    description: string;
  };
}
