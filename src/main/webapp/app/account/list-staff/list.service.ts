import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ListStaffService {
  private messageSource = new BehaviorSubject<IStaffOrigin[]>([]);
  // private backSource  = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  // currentBack = this.backSource.asObservable();

  constructor() {}

  changeMessage(message: IStaffOrigin[]) {
    this.messageSource.next(message);
  }
  // changLocal(local: string){
  //   this.backSource.next(local);
  // }
}
