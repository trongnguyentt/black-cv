import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListStaffService } from 'app/account/list-staff/list.service';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginDetailComponent } from 'app/entities/staff-origin/staff-origin-detail.component';

@Component({
  selector: 'list-staff',
  templateUrl: './list.component.html'
})
export class ListStaffComponent {
  staffOrigins!: IStaffOrigin[];

  // backHome!: string;
  constructor(protected modalService: NgbModal, private data: ListStaffService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(listStaff => (this.staffOrigins = listStaff));
    // this.data.currentBack.subscribe( content => (this.backHome = content));
  }

  details(staffOrigin: IStaffOrigin): void {
    const modalRef = this.modalService.open(StaffOriginDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.staffOrigin = staffOrigin;
  }
}
