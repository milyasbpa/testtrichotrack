export interface HomeCaresStorageInterface {
  history: {
    previous_url: string;
  };
  recommendation: {
    category: string | null;
    treatment_id: number;
  };
}
