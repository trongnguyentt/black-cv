import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-staff-origin-detail',
  templateUrl: './staff-origin-detail.component.html'
})
export class StaffOriginDetailComponent implements OnInit {
  staffOrigin?: IStaffOrigin;
  staffOriginX: IStaffOrigin | null = null;

  constructor(protected activatedRoute: ActivatedRoute, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staffOrigin }) => {
      this.staffOriginX = staffOrigin;
    });
  }

  previousState(): void {
    window.history.back();
  }

  clear() {
    this.activeModal.dismiss();
  }
}
