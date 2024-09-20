export interface GetScanScreeningRequestInterface {
  path: {
    scan_id: string;
  };
  params?: {
    language: string;
  };
}

export interface GetScanScreeningResponseInterface {
  dandruff: {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value: number | { [key: string]: number };
    };
  };
  dandruff_objects: {
    boundary: number[][];
  }[];
  follicle: {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value: number | { [key: string]: number };
    };
  };
  follicle_objects: {
    capacity: number;
    center: number[]; //[0.4,0.5]
    miniaturization: boolean;
    pigmentation: string;
  }[];
  hair: {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value: number | { [key: string]: number };
    };
  };
  hair_objects: {
    boundary: number[][];
  }[];
  pimple: {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value: number | { [key: string]: number };
    };
  };
  pimple_objects: {
    boundary: number[][];
  }[];
  scalp: {
    [key: string]: {
      name: string;
      unit: string;
      description: string;
      mapping_figure: string;
      value: number | { [key: string]: number };
    };
  };
}
