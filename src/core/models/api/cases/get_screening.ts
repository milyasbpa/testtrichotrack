export interface GetScreeningRequestInterface {
  params: {
    scan_ids: string;
    language: string;
  };
}

export interface GetScreeningResponseInterface {
  scan_id: number;
  chart: {
    "Hair Root Pigmentation": {
      value: {
        Grey: number;
        Golden: number;
        Brown: number;
        Black: number;
      };
      description: string;
    };
    "Scalp Texture": {
      value: number;
      description: string;
    };
    "Scalp Redness": {
      value: number;
      description: string;
    };
    "Scalp Wrinkles": {
      value: number;
      description: string;
    };
  };
  measurement: {
    // [key: string]: {
    //   value: number;
    //   description: string;
    // };
    "Avg Hair Thickness": {
      value: number;
      description: string;
    };
    "Avg Follicle Capacity": {
      value: number;
      description: string;
    };
    "Hair Density": {
      value: number;
      description: string;
    };
    "Follicle Density": {
      value: number;
      description: string;
    };
    "Thin Hair Rate": {
      value: number;
      description: string;
    };
    "Grey Hair Rate": {
      value: number;
      description: string;
    };
    "Hair Root Thinning Rate": {
      value: number;
      description: string;
    };
    "Dandruff Count": {
      value: number;
      description: string;
    };
    "Pimple Count": {
      value: number;
      description: string;
    };
    "Dead Follicle Count": {
      value: number;
      description: string;
    };
  };
  hairs: {
    boundary: number[][];
    thin: boolean;
    grey: boolean;
  }[];
  follicles: [
    {
      center: number[];
      capacity: number;
      thinning: boolean;
      pigmentation: string;
    }
  ];
  dandruffs: {
    boundary: number[][];
    type: string;
  }[];
  pimples: {
    boundary: number[][];
  }[];
}
