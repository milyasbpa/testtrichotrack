export interface SpotlightScanStorageInterface {
  index: number;
  data: {
    order: number;
    id: number;
    icon: string;
    image: string;
    region: string;
  }[];
}
