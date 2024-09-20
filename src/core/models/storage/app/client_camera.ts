export interface ClientCameraStorageInterface {
  selected: {
    id: number;
    name: string;
    photo: string;
    connection: string;
    device_id: string;
  } | null
}
