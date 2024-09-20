export interface GetFactorLevelInfoRequestInterface {
  params: {
    factor: string;
    level: number;
    language?: string;
  };
}

export interface GetFactorLevelInfoResponseInterface {
  description: string;
  examples: string[];
  level: string;
}
