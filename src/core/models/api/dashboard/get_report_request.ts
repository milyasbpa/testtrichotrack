export interface GetReportRequestRequestInterface {
  start: string;
  end: string;
  resolution: string;
  outlet?: number;
}

export type GetReportRequestResponseInterface = (string | number)[][];
