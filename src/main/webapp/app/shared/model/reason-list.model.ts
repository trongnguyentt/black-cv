export interface IReasonList {
  id?: number;
  idCV?: number;
  document?: string;
  id_reason?: number;
  status?: number;
}

export class ReasonList implements IReasonList {
  constructor(public id?: number, public idCV?: number, public document?: string, public id_reason?: number, public status?: number) {}
}
