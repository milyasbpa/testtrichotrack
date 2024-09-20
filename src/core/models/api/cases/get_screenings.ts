export interface GetScreeningsRequestInterface {
  params: {
    scan_ids: string;
    language: string;
  };
}

export type GetScreeningsResponseInterface = null | {
  [key: string]:
    | number
    | {
        [key: string]: {
          name: string;
          unit: string;
          description: string;
          mapping_figure: string;
          value: number | { [key: string]: number };
        };
      };
};
