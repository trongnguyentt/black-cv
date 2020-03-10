import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ListStaffService } from 'app/account/list-staff/list.service';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';

@Component({
  selector: 'list-staff',
  templateUrl: './list.component.html'
})
export class ListStaffComponent {
  staffOrigins!: IStaffOrigin[];
  // backHome!: string;
  constructor(private data: ListStaffService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(listStaff => (this.staffOrigins = listStaff));
    // this.data.currentBack.subscribe( content => (this.backHome = content));
  }
}
