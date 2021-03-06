export interface ICompany {
  id?: number;
  name?: string;
  businessAreas?: string;
  address?: string;
  status?: number;
  email?: string;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public name?: string,
    public businessAreas?: string,
    public address?: string,
    public status?: number,
    public email?: string
  ) {}
}
