import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';

@Injectable({
  providedIn: 'root'
})
export class ListStaffService {
  private messageSource = new BehaviorSubject<IStaffOrigin[]>([]);

  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: IStaffOrigin[]) {
    this.messageSource.next(message);
  }
}
