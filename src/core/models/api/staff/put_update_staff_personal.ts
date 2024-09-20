export interface PutUpdateStaffPersonalRequestInterface {
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
export interface PutUpdateStaffPersonal200SuccessResponseInterface {
  detail: string;
}
export interface PutUpdateStaffPersonal401SuccessResponseInterface {
  detail: string;
}
