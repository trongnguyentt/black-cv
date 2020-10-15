import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICompany } from 'app/shared/model/company.model';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private messageSource = new BehaviorSubject<ICompany[]>([]);

  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: ICompany[]) {
    this.messageSource.next(message);
  }
}
