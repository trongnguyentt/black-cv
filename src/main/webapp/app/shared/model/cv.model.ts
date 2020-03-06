export interface ICV {
  id?: number;
  idCompany?: number;
  name?: string;
  birthday?: string;
  phone?: string;
  email?: string;
  address?: string;
  job?: string;
  gender?: string;
  avatar?: string;
  reason?: string;
  reasonDetail?: string;
  fileUploadCV?: string;
  status?: number;
}

export class CV implements ICV {
  constructor(
    public id?: number,
    public idCompany?: number,
    public name?: string,
    public birthday?: string,
    public phone?: string,
    public email?: string,
    public address?: string,
    public job?: string,
    public gender?: string,
    public avatar?: string,
    public reason?: string,
    public reasonDetail?: string,
    public fileUploadCV?: string,
    public status?: number
  ) {}
}
