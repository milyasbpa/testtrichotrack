export interface PostUploadReportRequestInterface {
  case_id: number;
  report: string;
}

export interface PostUploadReportResponseInterface {
  detail: string;
}
