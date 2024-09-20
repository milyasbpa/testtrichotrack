export interface GetCameraRequestInterface {
  apiKey: string;
}

export interface GetCameraResponseInterface {
  id: number;
  name: string;
  device_id: string;
  connection: string;
  photo: string;
}
