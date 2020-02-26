export interface ISearch {
  name?: string;
  birthday?: string;
  phone?: string;
  email?: string;
}

export class Search implements ISearch {
  constructor(public name?: string, public birthday?: string, public phone?: string, public email?: string) {}
}
