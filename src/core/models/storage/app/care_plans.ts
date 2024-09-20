export interface CarePlansStorageInterface {
  history: {
    previous_url: string;
  };
  diagnosis: {
    category: string;
    rating: number;
    target: string;
    issue: string;
    level: string;
  };
  recommendation: {
    category: string | null;
    treatment_id: number;
  };
}
