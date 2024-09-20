export interface DiagnosisIssueStorageInterface {
  case_id: number;
  issue: string;
  category: string;
  target: string;
  rating: number;
  level: string;
}
