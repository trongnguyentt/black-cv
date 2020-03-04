import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStaffOrigin } from 'app/shared/model/staff-origin.model';

@Component({
  selector: 'jhi-staff-origin-detail',
  templateUrl: './staff-origin-detail.component.html'
})
export class StaffOriginDetailComponent implements OnInit {
  staffOrigin: IStaffOrigin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staffOrigin }) => {
      this.staffOrigin = staffOrigin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
