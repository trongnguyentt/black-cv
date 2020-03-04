export interface IStaffOrigin {
  id?: number;
  name?: string;
  email?: string;
  job?: string;
  advantages?: string;
  defect?: string;
  more?: string;
  status?: number;
}

export class StaffOrigin implements IStaffOrigin {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public job?: string,
    public advantages?: string,
    public defect?: string,
    public more?: string,
    public status?: number
  ) {}
}
