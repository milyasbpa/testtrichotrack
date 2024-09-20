export interface GetStaffsRequestInterface {
  skip?: number;
  limit: number;
  sort_by?: string;
  ascending?: boolean;
  target_outlet?: number;
  target_permission?: string;
  search?: string;
}

export interface GetStaffs200SuccessResponseInterface {
  id: number;
  mobile: string;
  name: string;
  outlet_id: number;
  permission: string;
  photo: string;
  position: string;
  reg_time: string;
  status: string;
}
