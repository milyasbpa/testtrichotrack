export interface GetStaffRequestInterface {
  staff_id: number;
}

export interface GetStaff200SuccessResponseInterface {
  id: number;
  outlet_id: number;
  name: string;
  mobile: string;
  permission: string;
  position?: string | null;
  photo?: string | null;
  reg_time: string;
  status: string;
}
