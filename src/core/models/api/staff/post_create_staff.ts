export interface PostCreateStaffRequestInterface {
  outlet_id: number;
  name: string;
  mobile: string;
  password: string;
  permission: string;
  position: string;
  photo?: string;
}
export interface PostCreateStaff200SuccessResponseInterface {
  id: number;
}
