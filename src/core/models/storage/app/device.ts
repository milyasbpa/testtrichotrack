export interface DeviceStorageInterface {
  mac_address: string;
  secret_client: {
    value: string;
    expired_time: string;
  };
}
