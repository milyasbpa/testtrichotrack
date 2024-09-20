export interface PutUpdateStaffAdministrativeRequestInterface {
  params: {
    staff_id: number;
  };
  data: {
    id: number;
    name?: string;
    mobile?: string;
    password?: string;
    outlet_id?: number;
    permission?: string;
    position?: string;
  };
}
export interface PutUpdateStaffAdministrative200SuccessResponseInterface {
  detail: string;
}
export interface PutUpdateStaffAdministrative401SuccessResponseInterface {
  detail: string;
}
