export interface IReason {
  id?: number;
  descriptons?: string;
  reasonName?: string;
  status?: number;
}

export class Reason implements IReason {
  constructor(public id?: number, public descriptons?: string, public reasonName?: string, public status?: number) {}
}
