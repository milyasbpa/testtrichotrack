export interface PartialScanImageInvalidStorageInterface {
  retake_region_order: number;
  orders: number[];
  scans: {
    error_message: {
      [key: string]: string;
    };
    order: number;
    id: number;
    icon: string;
    image: string;
    region: string;
  }[];
}
