// export interface PostCasesRequestInterface {
//   customer_id: number;
//   camera_id: number;
//   device_mac: string;
//   scans: {
//     image: string;
//     region: string;
//   }[];
// }
export interface PostCasesRequestInterface {
  camera_id: number;
  cleanse_state: string; // Not Cleansed | Fully Cleansed
  customer_id: number;
  device_mac: string;
  outlet_id: number;
  scans: {
    image: string;
    region: string;
  }[];
  with_global: boolean;
}

export interface PostCasesResponseInterface {
  id: number;
}

export interface PostCasesErrorResponseInterface {
  detail: {
    error_code: number;
    description: {
      [key: string]: string;
    };
    images: null | number[];
  }[];
}
